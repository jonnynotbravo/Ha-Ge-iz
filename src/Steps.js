import { useNavigate } from "react-router-dom";

const Steps = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/schools");
  };
  return (
    <div id="stepsOuter">
      <h1>Steps</h1>
      <div id="steps">
        <section>
          <div className="container">
            <div className="card">
              <div className="content">
                <div className="contentBx">
                  <h3>
                    <span className="stepNumbers">01</span>
                    <br />
                    <br />
                    <span className="des">
                      Browse the schools listed on our page.
                    </span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="content">
                <div className="contentBx">
                  <h3>
                    <span className="stepNumbers">02</span>
                    <br />
                    <br />
                    <span className="des">
                      Find a school that best fits your needs.
                    </span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="content">
                <div className="contentBx">
                  <h3>
                    <span className="stepNumbers">03</span>
                    <br />
                    <br />
                    <span className="des">
                      Fill out the form and reserve a place.
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <p>With just these 3 simple steps, you can start your jounrey</p>

        <div className="center">
          <button onClick={handleSubmit} className="btn">
            Browse Schools
          </button>
        </div>
      </div>
    </div>
  );
};

export default Steps;
