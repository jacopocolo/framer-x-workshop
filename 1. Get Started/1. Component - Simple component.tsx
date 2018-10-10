import * as React from "react";
import { PropertyControls, ControlType } from "framer";

interface Props {
    duration: number;
}

export class Test extends React.Component<Props> {

    static defaultProps = {
        duration: 1
    }

    static propertyControls: PropertyControls = {
        duration: {
            type: ControlType.Number,
            title: "Duration",
            min: 1,
            max: 10
        }
    }

    render() {
        const animation = `@keyframes rotate {
            from {
                transform: rotateX(0);
            }
            to {
                transform: rotateX(180deg);
            }
        }`;

        return (
            <div>
                <style>{animation}</style>

                <div style={{
                    backgroundColor: "red",
                    color: "white",
                    animation: `rotate ${this.props.duration}s ease-in-out infinite`
                }}>Hello D.Zone</div>
            </div>
        );
    }
}
