import { Modal, Button } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import {
  HeroContextType,
  HeroContext,
  DataProps,
} from "../HeroContextProvider";


const HeroBox = (props: DataProps) => {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState([]);

  const { data, setData } = useContext(HeroContext) as HeroContextType;

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const iterate = (obj: DataProps) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key as keyof typeof obj] === "object") {
        const newVal = { parent: key };
        setInfo((prev) => [...prev, newVal] as any);
        iterate(obj[key as keyof typeof obj] as DataProps);
      } else {
        const newVal = { [key]: obj[key as keyof typeof obj] };
        setInfo((prev) => [...prev, newVal] as any);
      }
    });
  };

  useEffect(() => {
    iterate(props);
  }, []);

  const addToCompare = () => {
    if (data && data?.length < 6) {
      const newVal = { info: info, props: props };
      setData((prev:any) => [...prev, newVal]);
    }
  };

  return (
    <div className="card text-center bg-secondary mb-3">
      <div className="card-body">
        <img className="card-img-top" src={props.image.url} alt="" />
        <div className="card-body">
          <button type="button" className="btn btn-dark mr-1" onClick={handleShow}>
            View More
          </button>
          <button type="button" className="btn btn-dark" onClick={addToCompare}>
            compare
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                className="card-img-top"
                style={{ width: "14rem" }}
                src={props.image.url}
                alt=""
              />
              <>
                {info.map((item: DataProps, index) => {
                  if (item?.parent) {
                    return (
                      <div key={index}>
                        <b>{`${Object.values(item)} :`}</b>
                      </div>
                    );
                  }
                  return (
                    <div key={index}>{`${Object.keys(item)} : ${Object.values(
                      item
                    )}`}</div>
                  );
                })}
              </>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HeroBox;
