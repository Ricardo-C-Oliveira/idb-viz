import React, { Component } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Button, Header, Image, Modal, Icon } from "semantic-ui-react";
import Dimensions from "react-dimensions";
import logo from "../../logoBID_white.png";

import "./ModalInfo.css";

class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Modal
          trigger={
            <Button icon inverted>
              <Icon name="info" />
            </Button>
          }
          defaultOpen
          dimmer="blurring"
          closeIcon="close"
        >
          <Modal.Header className="modal-header">
            Abount this Visualization
          </Modal.Header>
          <Modal.Content className="modal-info">
            <Modal.Description>
              <b>
                This visualization aims to provide a easy and quick way for
                people to explore the current status of Youth Employment,
                population between 15 and 24 years old, in
                Latin America.
                Data was originally created by the
                {" "}
                <a
                  href="http://www.iadb.org/en/inter-american-development-bank,2837.html"
                  target="blank"
                >
                  Inder-American Development Bank
                </a>
                {" "}and provided by
                {" "}
                <a href="https://www.vizforsocialgood.com/" target="blank">
                  Viz for Social Good
                </a>.
                <b>
                  To get started just pick a country by clicking on the map and
                  charts will updated accordingly.
                </b>
                <br />
                <br />
                <b>
                  Disclaimer: this application is not associated with the Inter
                  American Development Bank in any way.
                </b>
                <br />
                <br />
                <b>
                  Made by
                  {" "}
                  <a href="https://twitter.com/roliveiraGIS" target="blank">
                    Ricardo Oliveira
                  </a>
                  {" "}- 2017. Source code can be found at
                  {" "}<a
                    href="https://github.com/Ricardo-C-Oliveira/idb-viz"
                    target="blank"
                  >
                    this GitHub repo.
                  </a>
                </b>
              </b>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

// export default Dimensions({
//     containerStyle: {
//         height: 'calc(50vh)',
//         width: 'calc(100%)'
//     }
// })(BarChartCustom)

export default Dimensions()(InfoModal); // Enhanced component
