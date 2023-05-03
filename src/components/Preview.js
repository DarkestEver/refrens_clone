import "./Preview.css";

import React from "react";
import { Skeleton } from "antd";

const Preview = () => {
  return <>
    <div class="p-container">
        <div class="p-wrapper">
            <div class="p-heading">
                Preview
            </div>

            <div class="p-conmponent p-comp-style">
                <div class="p-details">

                    <Skeleton />
                </div>

                <div class="p-pricetext">
                  Price Available on Request
                </div>
            </div>

        </div>
    </div>
  </>
};

export default Preview;
