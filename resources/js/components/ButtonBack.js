import React from 'react';
import { IoIosArrowDropleftCircle} from "react-icons/io";
import {store} from "./Root";

class ButtonBack extends React.Component{

    handleBtnBack = () => {
        document.location.href = store.getState().back.link;
    };



    render() {

        return (
            <div onClick={this.handleBtnBack} className="btn-back__admin">
                <IoIosArrowDropleftCircle />
            </div>
        );
    }

}

export default ButtonBack;