import React, { Suspense, Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "./ModuleFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Container, ListGroupItem, Button, Media } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";

//adding font icon solid to library
library.add(fas);
//storing fetch data return in resource protected variable for suspense
const resource = fetchData();

let onDeleteClick = id => {
  //import { deleteModule } from "../actions/itemActions"
  //deleteModule comes here somehow to abandon modules for a user
  //TODO: further integration of this is needed in later release
  console.log(`deleted module ${id}`);
};

let round_to_precision = (x, precision) => {
  let y = +x + (precision === undefined ? 0.5 : precision / 2);
  return y - (y % (precision === undefined ? 1 : +precision));
};

let rating = arr => {
  let avg;
  let sum = arr.reduce((previous, current) => (current += previous));
  return (avg = sum / arr.length);
};

let progress = (dur, rem) => {
  let perc = (rem / dur) * 100;
  return Math.round(perc);
};

let dummyFetch = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  });
  return (await response).json();
};

let enrolled = num => {
  //set to dummy array length
  num = 10;

  dummyFetch("https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10", {
    num
  }).then(data => console.log(data));

  return (
    <Media object data-src={dummyFetch()} alt="Generic placeholder image" />
  );
};

//Continue modules
const IncompleteModules = modules => {
  let completed = modules.data.filter(module => module.continue === true);

  const seen = new Set();
  const uniqueData = completed.filter(({ sid }) => {
    if (seen.has(sid)) {
      return false;
    }
    seen.add(sid);
    return true;
  });

  return (
    <div>
      <h4 className="module-title">Continue your modules</h4>
      <div className="row module-list">
        <div className="col">Module name</div>
        <div className="col">Progress</div>
        <div className="col">Remaining</div>
        <div className="col">Actions</div>
      </div>

      {uniqueData.map(module => (
        <div
          className="module-list-item"
          key={module.moduleNumber}
          id={module._id}
        >
          <ListGroupItem className="d-flex align-items-center w-100">
            <div className="row w-100 align-items-center">
              <div className="col">{module.moduleName}</div>
              <div className="col">
                {progress(module.duration, module.remaining)}%
              </div>
              <div className="col">{module.duration} minutes</div>
              <div className="col actions d-flex flex-row">
                <Link to={`modules/${module._id}`} className="access-btn mx-2 btn btn-primary">
                  Continue module
                </Link>
                <Button
                  color="danger"
                  className="remove-btn mx-2"
                  size="sm"
                  onClick={onDeleteClick.bind(this, module._id)}
                >
                  Abandon module
                </Button>
              </div>
            </div>
          </ListGroupItem>
        </div>
      ))}
    </div>
  );
};

//Pick up new modules
const RemainingModules = modules => {
  //filtering out modules that aren't done yet and storing in variable remaining
  let remaining = modules.data.filter(module => module.done === false);

  const seen = new Set();
  const uniqueData = remaining.filter(({ sid }) => {
    if (seen.has(sid)) {
      return false;
    }
    seen.add(sid);
    return true;
  });

  return (
    <div>
      <h4 className="module-title">Pick up new modules</h4>
      <div className="row">
        <div className="col">Module name</div>
        <div className="col">Rating</div>
        <div className="col">Enrolled</div>
        <div className="col">Actions</div>
      </div>
      {uniqueData.map(module => (
        <div
          className="module-list-item"
          key={module.moduleNumber}
          id={module._id}
        >
          <ListGroupItem className="d-flex align-items-center w-100">
            <div className="row w-100 align-items-center">
              <div className="col">{module.moduleName}</div>
              <div
                className="col d-flex align-items-center"
                title={`Rating: ${rating(module.rating)}`}
              >
                <StarRatingComponent
                  editing={false}
                  name={`${module._id}Rating`}
                  starCount={5}
                  value={round_to_precision(rating(module.rating), 0.5)}
                />
              </div>
              <div className="col">{module.enrolled}</div>
              <div className="col actions d-flex flex-row">
                <Button
                  color="primary"
                  className="access-btn mx-2"
                  size="sm"
                  onClick={() => {
                    console.log(`accessed`);
                  }}
                >
                  Add module
                </Button>
                <Button
                  color="danger"
                  className="remove-btn mx-2"
                  size="sm"
                  onClick={onDeleteClick.bind(this, module._id)}
                >
                  Hide module
                </Button>
              </div>
            </div>
          </ListGroupItem>
        </div>
      ))}
    </div>
  );
};

const ModuleData = () => {
  const modules = resource.module.read();

  return (
    <Fragment>
      {IncompleteModules(modules)}
      {RemainingModules(modules)}
    </Fragment>
  );
};

let ModuleItem = () => {
  return (
    <Suspense
      fallback={
        <Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={["fas", "spinner"]} spin size="3x" />
        </Container>
      }
    >
      <ModuleData />
    </Suspense>
  );
};

export default ModuleItem;
