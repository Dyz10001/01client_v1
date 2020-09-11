import banner from "./banner.json";
import floor from "./floor.json";
import mockjs from "mockjs";
mockjs.mock("/mock/banner", { code: 200, data: banner });
mockjs.mock("/mock/floor", { code: 200, data: floor });
