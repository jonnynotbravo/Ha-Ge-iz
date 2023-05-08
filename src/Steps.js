const Steps = () => {
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
                      Fill out the form and acquire a place.
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <p>With just this 3 simple steps, you can start your jounrey</p>
        <div class="center">
          <a href="https://codepen.io/chloe47632">
            <button type="submit" class="btn">
              Click me
            </button>{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Steps;
