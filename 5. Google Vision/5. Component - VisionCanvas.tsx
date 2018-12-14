import * as React from "react";
import { 
    PropertyControls, 
    ControlType 
} from "framer";

/* Import Drawable Canvas Element */
import DrawableCanvas from "react-drawable-canvas";
import styled from "styled-components";

// New Whiteboard Button (For Clearing)
const NewWhiteBoardButton = styled.button`
    font-family: "CiscoSansTT", sans-serif;
    font-size: 22px;
    color: #00C4D6;
    position: absolute;
    bottom: 36px;
    left: 40px;
    border: none;
    background: transparent;
    
    :focus {
        outline: 0;
    }
`;

interface Props {
    googleApiKey: string,
    touchThrottleIntervalTime: number,
}

/*
*   The time-interval after a touchUp or mouseUp until the API request is fired for the canvas.
*   - This allows for text to be written as individual letters (block text) before requesting handwriting recognition of the canvas.
*/
var touchThrottleTimer;

export class VisionCanvas extends React.Component<Props> {
   
    static defaultProps = {
        touchThrottleInterval: 1000
    }

    /* Setup Framer Property Controls */
    static propertyControls: PropertyControls = {
        touchThrottleIntervalTime: {
            type: ControlType.Number,
            title: "Touch Throttle"
        },
        googleApiKey: { 
            type: ControlType.String, 
            title: "Google API Key",
            placeholder: "Your Google API Key"
        },
    }

    /* Set Initial State */
    state = {
        visionResults: [],
        clear: false,
        lineWidth: 4,
        brushColor: "red",
        canvasStyle: {
            width: "50px"
        },
        isDrawing: false
    };

    recogniseHandwriting() {

        console.log("Recognising handwriting!");

        /* Make Google API Request */ 
        const apiKey = this.props.googleApiKey;
        const url = `https://vision.googleapis.com/v1/images:annotate?alt=json&key=${apiKey}`;
        
        // Encode Image from Canvas (Base64)
        const canvasElement: any = this.refs.drawableCanvas;
        const context: CanvasRenderingContext2D = canvasElement.state.context;
        const encodedImage = context.canvas.toDataURL().split(',')[1];

        /** 
         *  Create Payload for API Request
         *  - This is defined by the Google Developer API, read more here: https://cloud.google.com/vision/docs/ocr#detecting_handwriting
         */
        const data = {
            "requests": [{
                "image": {
                    "content": encodedImage
                },
                "features": [
                    { "type": "DOCUMENT_TEXT_DETECTION" }
                ],
                "imageContext": { 
                    "languageHints": ["en-t-i0-handwrit"]
                }
            }]
        };

        // Construct parameters for API Request
        const params = {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data),
            method: "POST"
        };
        
        /** 
         *  Make Google Vision API Request
         */
        fetch(url, params)
        .then(data=>{return data.json()})
        .then(result=>{

            /**
             *  Only get what we need from the Google Vision API response / results
             */
            if (result.responses[0].textAnnotations === undefined || result.responses[0].textAnnotations.length > 0) {

                // Only add most recent item
                const last = result.responses[0].textAnnotations[result.responses[0].textAnnotations.length-1];

                /* Store React State with new results */
                this.setState({
                    visionResults: this.state.visionResults.concat({boundingPoly: last.boundingPoly, description: last.description}),
                    clear: false
                });
            }
        })

        .catch(error=>console.log(error))
    }

    /* Handle Mouse Move */
    // handleOnMouseDown() {
    //     this.setState({isDrawing: true});
    // }

    /* Handle Touch End Event */
    handleOnTouchEnd() {

        // Request
        this.recogniseHandwriting();

        // if (this.state.isDrawing) {
        //     console.log("starting timer");
            

        //     touchThrottleTimer = setTimeout(() => {
        //         this.setState({isDrawing: false});
                
        //         // Request
        //         this.recogniseHandwriting();
    
        //     }, this.props.touchThrottleIntervalTime);
        // }
    }

    handleClickNewWhiteboard(e) {

        // Clear whiteboard
        this.setState({
            clear: true,
            visionResults: []
        });
    }

    render() {
        return (
            <div style={{
                width: "100%",
                height: "100%",
                background: "transparent",
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
                outline: "none"
            }} onMouseDown={() => this.setState({isDrawing: true})} onMouseUp={this.handleOnTouchEnd.bind(this)}>
            
            {
                    this.state.visionResults.map((element, x) => {
                            
                            /**
                             *  Iterate through results and create HTML elements (red dots) for text bounding boxes
                             **/
                            const boundingBoxesDots = element.boundingPoly.vertices.map((vertice, i) => {
                                
                                return <div key={i.toString()} style={{
                                    backgroundColor: 'blue',
                                    position: 'absolute',
                                    top: vertice.y,
                                    left: vertice.x,
                                    width: '5px',
                                    height: '5px',
                                    borderRadius: "50%"
                            }}></div>});
                            
                            // Position for all vertices
                            const position = element.boundingPoly.vertices;
                            
                            return (
                                <div>
                                    {boundingBoxesDots}
                                    
                                    <span key={x.toString()} style={{
                                        position: 'absolute',
                                        textAlign: 'center',
                                        backgroundColor: 'blue',
                                        borderRadius: '8px',
                                        padding: '6px 10px',
                                        color: 'white',
                                        fontSize: '30px',
                                        top: position[position.length-1].y,
                                        left: `${(position[position.length-1].x+position[2].x)/2}px`
                                    }}>{element.description}</span>
                                </div>
                            );
                })
            }

            <NewWhiteBoardButton onMouseUp={this.handleClickNewWhiteboard.bind(this)}>New whiteboard</NewWhiteBoardButton>

            <DrawableCanvas {...this.state} ref="drawableCanvas" />

            </div>
        )
    }
}
