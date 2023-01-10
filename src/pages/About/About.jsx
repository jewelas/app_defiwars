import React from "react";
import appStyle from "../../App.module.css";

const About = () => (
  <div className={appStyle.container}>
    <div class="tg-wrap">
      <table border="0px">
        <tbody>
          <tr>
            <td></td>
            <td>
              <img src="/img/Daniel.jpg" alt="Founder" />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <img src="/img/Lee.jpg" alt="Co-Founder" />
            </td>
            <td>
              <img src="/img/Jaime.jpg" alt="Chief Advisor" />
            </td>
            <td>
              <img src="/img/Jonathan.jpg" alt="Chief Developer" />
            </td>
          </tr>
          <tr>
            <td>
              <img src="/img/Hiram.jpg" alt="Chief Designer" />
            </td>
            <td>
              <img src="/img/Sailis.jpg" alt="Community Manager" />
            </td>
            <td>
              <img src="/img/Ayobami.jpg" alt="Content Manager" />
            </td>
          </tr>
          <tr>
            {/* <td><img src="/img/Cedric.jpg" alt="Social Media Ambassador" /></td> */}
            <td></td>
            <td>
              <img src="/img/Xavier.jpg" alt="Listings Ambassador" />
            </td>
            <td>
              <img src="/img/David.jpg" alt="Design Lead" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default About;
