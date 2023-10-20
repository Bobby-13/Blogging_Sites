import React from "react";
import "./frontpage.css";
// import food from "../../assests/images/OK2WEZ0.jpg";
import food from "../../assets/images/OK2WEZ0.jpg"
import Footer from "../footer/footer"
import { Link } from "react-router-dom";
function Frontpage() {
  return (
    <div className="Frontpage">
      <div className="topbar">
        <div className="container">
          <h1>Divum Blogs</h1>
          <div className="buttons">
            <Link to="/login" id="login">Login</Link>
            <Link to="/login" id="signup">Sign Up</Link>
          </div>
        </div>
      </div>
      <div className="containers container-1">
        <div className="container">
          <div className="content">
            <h1>Explore Fashion</h1>
            <p>
              Dive into a treasure trove of insightful articles and engaging
              content. Explore a broad spectrum of fashion, from the latest
              innovations. The goal to inform, inspire, and entertain, all while
              providing you with valuable insights and tips.Join us on this
              journey of discovery and exploration as we share our passion for
              knowledge and creativity. Come find a vibrant community of readers
              and contributors who share a common curiosity about the world
              around us.
            </p>
          </div>
          <img src="https://i2.wp.com/bayo.com.ph/wp-content/uploads/2021/08/Circular-Model.jpg?fit=%2C&ssl=1"></img>
        </div>
      </div>
      <div className="containers container-2">
        <div className="container">
          <img src={food}></img>
          <div className="content">
            <h1>Rhythm of Tastes</h1>
            <p>
              {" "}
              Taste a gastronomic journey through the flavors and cultures of
              the culinary universe. From mouthwatering recipes and cooking tips
              to restaurant reviews and foodie adventures, we're here to
              tantalize your taste buds and inspire your inner chef. Join us as
              we explore the art of food, one delicious bite at a time, and
              embark on a culinary adventure like no other. Bon appétit!
            </p>
          </div>
        </div>
      </div>
      <div className="containers container-3">
        <div className="container">
          <div className="content">
            <h1>Around The World</h1>
            <p>
              Embark on a captivating voyage with our travel! We're your
              passport to a world of adventure, where we explore exotic
              destinations, share travel tips, and recount unforgettable
              experiences. Whether you're a seasoned globetrotter or planning
              your first getaway, our blog is your ultimate travel companion.
              Let us inspire your wanderlust, offer practical advice, and
              transport you to the most enchanting corners of the globe. Get
              ready to explore and discover the world with us!
            </p>
          </div>
          <img src="https://i.pinimg.com/736x/d6/c9/c8/d6c9c88bcdbfb4eec681186bba1afd73.jpg"></img>
        </div>
      </div>
      <div className="containers container-4">
        <div className="container">
          <img src="https://blog.ericson.com/hs-fs/hubfs/RFID.png?width=350&name=RFID.png"></img>
          <div className="content">
            <h1>Technology</h1>
            <p>
              Step into the future of technology, where innovation and
              information converge. We're your source for the latest tech
              trends, gadget reviews, and in-depth insights into the digital
              world. From artificial intelligence to cutting-edge devices, we
              unravel the complex world of technology to make it accessible and
              exciting for everyone. Join us as we navigate the ever-evolving
              tech landscape, providing you with knowledge and inspiration to
              stay ahead in this digital age.
            </p>
          </div>
        </div>
      </div>
      <div className="containers container-5">
        <div className="container">
          <div className="content">
            <h1>Life Upto The Styles</h1>
            <p>
              We believe that life is a canvas, and every day is an opportunity
              to paint it with vibrant colors. We explore diverse aspects of
              modern living, including travel, relationships, self-care, and
              more. Our articles are a blend of creativity and practicality,
              designed to inspire you to create a life that's uniquely your own.
              Join us as we navigate the intricate tapestry of modern
              lifestyles, offering insights and ideas to help you live with
              purpose and passion.
            </p>
          </div>
          <img src="https://cdn.dribbble.com/users/631735/screenshots/5265412/media/ab2208351f7dde769187eeea1b5a6226.png?resize=400x300&vertical=center"></img>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Frontpage;
