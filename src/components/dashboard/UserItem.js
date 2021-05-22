import React from 'react';

class UserItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : props.element.id,
            name : props.element.name,
            phone : props.element.phone,
            numPerson : props.element.numPerson,
            estate : props.element.estate,
            longitude : props.element.longitude,
            latitude : props.element.latitude
        };
    }

    render() {
        console.log("UserItem : ", this.state.name, " state ", this.state.estate);

        if (this.state.estate === "STATE_UNAUTHENTICATED")
            return (
                <div>
                    <h3>{ this.state.name }</h3>
                    <p>{ this.state.phone }</p>
                    <button>Chi tiet</button>
                    <button>Them</button>
                </div>
            )
        else 
            return (
                <div>
                    <h3>{ this.state.name }</h3>
                    <p>{ this.state.phone }</p>
                    <button>Chi tiet</button>
                    <button>Xoa</button>
                </div>
            );
    }
}

export default UserItem;

