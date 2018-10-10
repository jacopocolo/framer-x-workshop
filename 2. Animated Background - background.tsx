import * as React from "react";
import { PropertyControls, ControlType } from "framer";

// Define type of property
interface Props {
    animate: boolean;
    text: string;
    blur: number;
    duration: number;
    circleWidth: number;
    circleHeight: number;
}

export class Background extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        animate: true,
        text: "Hello",
        blur: 25,
        duration: 4,
        circleWidth: 400,
        circleHeight: 400
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        animate: { 
            type: ControlType.Boolean,
			title: "Animate"
        },
        text: { type: ControlType.String, title: "Text" },
        duration: { type: ControlType.Number, min: 1, max: 50, title: "Duration"},
        circleWidth: {type: ControlType.Number, min: 400, max: 800, title: "Circle Width"},
        circleHeight: {type: ControlType.Number, min: 400, max: 800, title: "Circle Height"},
        blur: {type: ControlType.Number, min: 1, max: 200, title: "Blur Value"}
    }

    render() {

        /* Animation Duration Difference */
        const animationDelta = 3;
        const {circleWidth, circleHeight, animate, duration, blur} = this.props;

        /* Animation State */
        let animationState = (!animate ? 'paused': 'running');

        // Keyframe Animation
        const animation = `
            @-webkit-keyframes horizontal {
                from {
                    left: -${circleWidth}px;
                    transform: rotateY(0deg);
                }
                to {
                    left: 100%;
            }`;

        return (
            <div style={{
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                <p style={{
                    color: "white",
                    fontSize: "108px",
                    fontFamily: "CiscoSansTT-Thin, Arial, Helvetica, sans-serif",
                    zIndex: 1000
                }}>
                    {this.props.text}
                </p>

                <style>{animation}</style>

                <div style={{
                            position: "absolute",
                            width: `${circleWidth}px`,
                            height: `${circleHeight}px`,
                            borderRadius: "50%",
                            backgroundColor: "#6E3DC6",
                            animation: `horizontal ${duration}s ease-in-out infinite`,
                            animationDirection: "alternate",
                            animationPlayState: `${animationState}`,
                            filter: `blur(${blur}px)`,
                        }}
                    />

                <div style={{
                        position: "absolute",
                        width: `${circleWidth}px`,
                        height: `${circleHeight}px`,
                        borderRadius: "50%",
                        backgroundColor: "#FF9200",
                        animation: `horizontal ${duration + animationDelta}s ease-in-out infinite`,
                        animationDirection: "alternate",
                        animationPlayState: `${animationState}`,
                        filter: `blur(${blur}px)`,
                    }}
                />

                <div style={{
                        position: "absolute",
                        width: `${circleWidth}px`,
                        height: `${circleHeight}px`,
                        borderRadius: "50%",
                        backgroundColor: "blue",
                        animation: `horizontal ${duration + animationDelta * 2}s ease-in-out infinite`,
                        animationDirection: "alternate",
                        animationPlayState: `${animationState}`,
                        filter: `blur(${blur}px)`,
                    }}
                />
    
            </div>
        );
    }
}

