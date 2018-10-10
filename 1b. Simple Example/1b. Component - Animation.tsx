import * as React from "react";
import { PropertyControls, ControlType } from "framer";

// Define type of property
interface Props {
    duration: number;
    color: string;
}

export class Animation extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        duration: 5,
        color: 'red'
    } 

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        duration: { 
            type: ControlType.Number, 
            title: "Duration",
            min: 1,
            max: 20
        },
        color: {
            type: ControlType.Color,
            title: "Color"
        }
    }

    render() {
        
        console.log(this.props.duration);

        // Define the Animation
        const animation = `
        @keyframes horizontal {
            from {

                transform: rotateY(0deg);
            }
            to {
                transform: rotateY(90deg);
        }`;

        return (
                <div>
                    
                    <style>{animation}</style>
                    
                    <div style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            backgroundColor: this.props.color,
                            animation: `horizontal ${this.props.duration}s ease-in-out infinite`,
                            animationDirection: "alternate"
                        }} />

                </div>
        );
    }
}
