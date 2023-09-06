import { useContext } from "react";
import {
  HeroContextType,
  HeroContext,
  DataProps,
} from "../HeroContextProvider";

const Comparison = () => {
  const { data, setData } = useContext(HeroContext) as HeroContextType;

  const removeHero = (id: number) => {
    const newData = data?.filter((item) => {
      return item?.props?.id !== id;
    });
    setData(newData);
  };

  return (
    <div>
      {data && data?.length > 0 && <h3>Comperison</h3>}
      <div className="comperisoncontainer">
        {data?.map((item: DataProps, index) => {
          return (
            <div key={index} className="comperoisonBox">
              <div
                onClick={() => removeHero(item?.props?.id)}
                className="removeIcon"
              >
                X
              </div>
              <img
                className="card-img-top"
                style={{ width: "14rem" }}
                src={item.props.image.url}
                alt=""
              />
              <div className="comperisonInfoBox">
                {item.info.map((item: DataProps, index: number) => {
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comparison;
