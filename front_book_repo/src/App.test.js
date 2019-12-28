import React from "react";
import { render } from "@testing-library/react";

import Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";
import { configure, mount, shallow } from "enzyme";
import renderer from "react-test-renderer";

import App from "./App";
import BooksTable from "./components/booksTable";
import { books, genres } from "./testingData/testingData";
import FilterMenu from "./components/common/filterMenu";
import NavBar from "./components/navBar";

// Enzyme setup
configure({ adapter: new Adapter() });

// Snapshot testing

describe("NavBar", () => {
  test("NavBar component renders (snapshot)", () => {
    const component = renderer.create(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Books table", () => {
  test("Books table component renders (snapshot)", () => {
    const component = renderer.create(<BooksTable books={books} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Filter menu", () => {
  test("Filter menu component renders (snapshot)", () => {
    const component = renderer.create(<FilterMenu items={genres} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// AXIOS TESTING
