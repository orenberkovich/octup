import { useState } from "react";
import { HeroContextProvider, DataProps } from "./HeroContextProvider";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import HeroBox from "./components/HeroBox";
import Comparison from "./components/Comparison";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [heros, setHeros] = useState([]);
  const [query, setQuery] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const searchSuperHero = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `https://www.superheroapi.com/api.php/10223009321394258/search/${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setHeros(data.results);
      setShowMessage(true);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      setShowMessage(false);
    }
  };

  return (
    <HeroContextProvider>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">SuperHero App</Navbar.Brand>
          <Navbar.Collapse id="nabarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <Form
              className="d-flex"
              onSubmit={searchSuperHero}
              autoComplete="off"
            >
              <FormControl
                type="search"
                placeholder="SuperHero Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {heros?.length > 0 ? (
          <div className="container">
            <div className="grid">
              {heros.map((heroReq: DataProps) => (
                <HeroBox key={heroReq.id} {...heroReq} />
              ))}
            </div>
          </div>
        ) : (
          <h2>
            {query !== "" && showMessage ? "Sorry !! No SuperHero Found" : ""}
          </h2>
        )}
      </div>
      <br />
      <Comparison />
    </HeroContextProvider>
  );
}

export default App;
