// These are imported by default by Framer X
import * as React from "react";
import { PropertyControls, ControlType } from "framer";

// Let's import the Button component from collab UI 
import Button from "@collab-ui/react/lib/Button"
// Let's also import the collab-ui CSS. 
import "@collab-ui/core/css/collab-ui.min.css"

// Here we define an object that holds some specific css of our component.
// Let's set it to fill the container. 
// You'll notice that the syntax is slightly different than classic CSS
// this is a react specific way of defining CSS proprieties 
const style: React.CSSProperties = {
    height: "100%",
    width: "100%"
};

// Define type of property we will expose in Framer X side panel
// you need to specify the name of the property and the type
interface Props {
    text: string,
    darkOrLight: array,
    color: array,
    buttonState: array
}

// Here's our component
export class Button extends React.Component<Props> {

    // Set a default for properties
    static defaultProps = {
    text: "Hello World!",
    darkOrLight: " ",
    color: " ",
    buttonState: " "
    }

    // Here we define what to show in Framer X side panel
    // and what happens when we select specific values

    static propertyControls: PropertyControls<Props> = {

    //text is pretty simple: it's a string of text
    text: { type: ControlType.String, title: "Text" },
    
    // All the other properties we use are enumerators
    // basically a collection of interchangable elements
    // They all allow us to set css classes on the component
    // In example below if nothing is selected we set a class
    // to be an empty string because by default the components
    // don't need anything to render the Light styling
    // if we select dark, however, we pass the “cui--dark" class
    // which sets the component in dark mode
    darkOrLight: {type: ControlType.Enum,
        options: [" ", "cui--dark"],
        optionTitles: ["Light", "Dark"],
        title: "Background",
    },

    // Same as above just with more variables. In this case we use
    // classes to set the color of the button
    color: {type: ControlType.Enum,
        options: [" ", "cui-button--blue", "cui-button--green", "cui-button--red", "cui-button--orange", "cui-button--yellow", "cui-button--mint", "cui-button--purple", "cui-button--pink", "cui-button--white"],
        optionTitles: ["Default", "Blue", "Green", "Red", "Orange", "Yellow", "Mint", "Purple", "Pink", "White"],
        title: "Color",
    },

    // Same as above. In this case we use classes to fix the state of
    // the button. By default a component will render all the states when
    // interacted with in the preview. But what if we want to fix it in a
    // specific state, in example “disabled”?  
    buttonState: {type: ControlType.Enum,
        options: [" ", "hover-state", "active-state hover-state", "focus-state", "disabled"],
        optionTitles: ["Default", "Hover", "Pressed/Active", "Focus", "Disabled"],
        title: "State",
    }
    }

    // This function is shared across all react components
    // it renders the component and takes care of keeping it up to date
    render() {
    
        // it's very important that you always have a <div> </div> around
    // your component. It won't work otherwise.
    
    // Classes have a specific construction in react but in the end
    // they are similar to regular css. What we are doing here is passing
    // darkOrLight to the div class. If darkOrLight is set to Light it
    // won't pass anything so the component will be rendered in default
    // style. If darkOrLight is set to Dark, it will pass "cui--dark" and
    // the componet will render in dark style.  

    return <div className={this.props.darkOrLight}>
    <Button className={`cui-button ${this.props.color} ${this.props.buttonState}`}>{this.props.text}</Button>
    </div>;
    }
}
