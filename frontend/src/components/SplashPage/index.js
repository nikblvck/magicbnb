import {NavLink} from "react-redux";
import "./SplashPage.css"


function SplashPage() {
  return (
    <>
      <div className="splashContainer">
        <div className="splashContent">
          <div>
            <h1>ALOHAMORA!</h1>
            <div>
              <img src="https://res.cloudinary.com/blvckmagic/image/upload/v1639350427/magicbnb/image_lbez73.jpg" className="splashImage"></img>
            </div>
            <p>
              Welcome to Magicbnb, where you can find your home <i>away</i> from
              Hogwarts (Ilvermony or Durmstrang)! We have a plethora of hosts in
              the Pacific Northwest awaiting you!{" "}
            </p>
            <br />
            <p>
              <i>All</i> witches and wizards are welcome!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SplashPage;
