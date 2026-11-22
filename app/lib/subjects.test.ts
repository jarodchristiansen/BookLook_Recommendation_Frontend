import { splitSubjects } from "./subjects";

describe("splitSubjects", () => {
  it("splits a comma-separated string", () => {
    expect(splitSubjects("Fantasy, Young adult")).toEqual(["Fantasy", "Young adult"]);
  });

  it("parses a JSON list literal", () => {
    expect(splitSubjects('["Vida en otros planetas", "Novela", "Robots"]')).toEqual([
      "Vida en otros planetas",
      "Novela",
      "Robots",
    ]);
  });

  it("parses a Python-style list literal", () => {
    expect(splitSubjects("['Magic', 'Wizards']")).toEqual(["Magic", "Wizards"]);
  });

  it("strips stray brackets and quotes from a malformed list", () => {
    expect(splitSubjects('["Unclosed", "list')).toEqual(["Unclosed", "list"]);
  });

  it("drops blanks and duplicates", () => {
    expect(splitSubjects("Magic, , Magic")).toEqual(["Magic"]);
    expect(splitSubjects(undefined)).toEqual([]);
    expect(splitSubjects(["Magic", " "])).toEqual(["Magic"]);
  });
});
