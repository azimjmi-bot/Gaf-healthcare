import assert from "node:assert/strict";
import test from "node:test";
import {
  collapseRepeatedPlaces,
  containsPlace,
  hospitalInCity,
  joinPlaceParts,
  withCampus,
} from "@/lib/i18n/place-labels";
import { campusLine, campusLocation } from "@/lib/doctor-profile";
import type { Doctor } from "@/lib/doctors";

test("joinPlaceParts does not append a city the hospital name already has", () => {
  assert.equal(
    withCampus("مستشفيات غلين إيغلز، بنغالور", "بنغالور", "الهند"),
    "مستشفيات غلين إيغلز، بنغالور، الهند",
  );
  assert.equal(
    withCampus("إم جي إم للرعاية الصحية، تشيناي", "تشيناي"),
    "إم جي إم للرعاية الصحية، تشيناي",
  );
  assert.equal(withCampus("مستشفى ريلا", "تشيناي", "الهند"), "مستشفى ريلا، تشيناي، الهند");
});

test("collapseRepeatedPlaces removes concatenated and comma-duplicated cities", () => {
  assert.equal(collapseRepeatedPlaces("بنغالوربنغالور"), "بنغالور");
  assert.equal(collapseRepeatedPlaces("تشينايتشيناي"), "تشيناي");
  assert.equal(
    collapseRepeatedPlaces("مستشفيات غلين إيغلز، بنغالور، بنغالور"),
    "مستشفيات غلين إيغلز، بنغالور",
  );
  assert.equal(
    collapseRepeatedPlaces("إم جي إم للرعاية الصحية، تشيناي، تشيناي، الهند"),
    "إم جي إم للرعاية الصحية، تشيناي، الهند",
  );
});

test("Navi Mumbai is not treated as a second Mumbai suffix after collapsing", () => {
  assert.equal(
    withCampus("مستشفيات أبولو، نافي مومباي", "مومباي", "الهند"),
    "مستشفيات أبولو، نافي مومباي، الهند",
  );
  assert.equal(containsPlace("مستشفيات أبولو، نافي مومباي", "مومباي"), true);
});

test("hospitalInCity does not say بمدينة when the campus already names the city", () => {
  assert.equal(hospitalInCity("مستشفى ريلا", "تشيناي"), "مستشفى ريلا بمدينة تشيناي");
  assert.equal(
    hospitalInCity("غلين إيغلز هيلث سيتي تشيناي", "تشيناي"),
    "غلين إيغلز هيلث سيتي تشيناي",
  );
});

test("joinPlaceParts skips empty parts and uses an Arabic comma", () => {
  assert.equal(joinPlaceParts(["بنغالور", "", "الهند"]), "بنغالور، الهند");
});

const gleneagles = {
  hospitalName: "مستشفيات غلين إيغلز، بنغالور",
  city: "Bengaluru",
  country: "India",
} as Doctor;

const rela = {
  hospitalName: "مستشفى ريلا",
  city: "Chennai",
  country: "India",
} as Doctor;

test("campusLocation omits a city already in the Arabic hospital name", () => {
  assert.equal(campusLocation(gleneagles, undefined, "ar"), "الهند");
  assert.equal(campusLocation(rela, undefined, "ar"), "تشيناي، الهند");
});

test("campusLocation leaves the English City, Country pair unchanged", () => {
  const english = {
    hospitalName: "Gleneagles Hospitals, Bengaluru",
    city: "Bengaluru",
    country: "India",
  } as Doctor;
  assert.equal(campusLocation(english, undefined, "en"), "Bengaluru, India");
});

test("campusLine does not repeat the Arabic city", () => {
  assert.equal(campusLine(gleneagles, undefined, "ar"), "مستشفيات غلين إيغلز، بنغالور");
  assert.equal(campusLine(rela, undefined, "ar"), "مستشفى ريلا، تشيناي");
});
