import Header from "./Header";

const SchoolsList = () => {
  return (
    <div>
      <Header />
      <main>
        <ul id="cards">
          <li className="card" id="card_1">
            <div className="card__content">
              <div>
                <h2>Card One</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>
                  <a href="#top" className="btn btn--accent">
                    Read more
                  </a>
                </p>
              </div>
              <figure>
                <img
                  src="https://codyhouse.co/demo-tutorials/stacking-cards/assets/img/img-1.jpg"
                  alt="Image description"
                />
              </figure>
            </div>
          </li>
          <li className="card" id="card_2">
            <div className="card__content">
              <div>
                <h2>Card Two</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>
                  <a href="#top" className="btn btn--accent">
                    Read more
                  </a>
                </p>
              </div>
              <figure>
                <img
                  src="https://codyhouse.co/demo-tutorials/stacking-cards/assets/img/img-2.jpg"
                  alt="Image description"
                />
              </figure>
            </div>
          </li>
          <li className="card" id="card_3">
            <div className="card__content">
              <div>
                <h2>Card Three</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>
                  <a href="#top" className="btn btn--accent">
                    Read more
                  </a>
                </p>
              </div>
              <figure>
                <img
                  src="https://codyhouse.co/demo-tutorials/stacking-cards/assets/img/img-3.jpg"
                  alt="Image description"
                />
              </figure>
            </div>
          </li>
          <li className="card" id="card_4">
            <div className="card__content">
              <div>
                <h2>Card Four</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>
                  <a href="#top" className="btn btn--accent">
                    Read more
                  </a>
                </p>
              </div>
              <figure>
                <img
                  src="https://codyhouse.co/demo-tutorials/stacking-cards/assets/img/img-2.jpg"
                  alt="Image description"
                />
              </figure>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default SchoolsList;
