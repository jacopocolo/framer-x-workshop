import * as React from "react";
import { PropertyControls, ControlType, Data } from "framer";

// Let's import the Avatar component from collab-ui
import Avatar from "@collab-ui/react/lib/Avatar";
// Let's import collab-ui css
import "@collab-ui/core/css/collab-ui.min.css";

// Let's set a tiny bit of CSS for styling. We'll see later what it does
const style: React.CSSProperties = {
    margin: "20px",
    display: "inline-block",
    textAlign: "center"
};

// Here's our component
export class Avatar extends React.Component {

    // This is another foundamental concept of react: state
    // A state can be many things, what's important for you now is that
    // by setting a state we are telling react to observe the values in state
    // and re-render the component when the state changes. React takes care of
    // everything else
    state = {
        astronauts: []
    }

    // This looks complicated. But it's not and it's the one thing you'll need
    // to ask things to the internet and use what the internet replies in your 
    // prototype. 
    fetchAstronauts() {
        // We call an API. This API will return a json that contains the names
        // of the astronauts currently in space.
        fetch("http://api.open-notify.org/astros.json")
        // when we get the data, we make sure that the data is in json format 
        .then(data=>{return data.json()})
        // and then we assign the data to a variable called astronautsResult
        // we will not use it for long so don't get attatched to it
        .then(astronautsResult=>{
                // We then set a state in the state we create above with the results
                // and since react monitors the state… once we get the results, react
                // will update the component with the names we got from the API
                this.setState({
                    astronauts: astronautsResult.people
                });      
        })
    }

    // Here we check if the component has been rendered for the first time
    // and then we call the function that actually calls the API
    componentDidMount(){
        this.fetchAstronauts();
    };

    render() {
        // A slightly different version of return: in this case we use return()
        // because we need to run some code in the component. The code
        // is there to allow us to render a number of components based on the
        // results we get back from the internet.
        return (
            <div>
                {
                    // Based on the state we render as many avatars as we have
                    // names. This also looks a bit compelx but it's not
                    this.state.astronauts.map(element => {
                        // What's important is how we use the element.name (the name
                        // of our astronauts). We use them in the title value, which
                        // defines what initials are rendered in the avatar and in the
                        // paragraph.
                        return <div style={style}>
                            <Avatar size={80} type="dnd" title={element.name}/>
                            <p>{element.name}</p>
                        </div>
                    })
                }

            </div>
        )
    }
}
