"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_path_name = void 0;
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var utilities_1 = require("../../utilities/utilities");
var images = express_1.default.Router();
var directoryPath_image = path_1.default.join(__dirname, '../../../images');
var directoryPath_thumbs = path_1.default.join(__dirname, '../../../thumbs');
var routes = express_1.default.Router();
images.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, imagepath, filename_output, output, check_highet, check_width, check_path_name_for_image_dir, check_path_name_for_thumbs_dir, get_resizeImage;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                filename = "".concat(req.query.filename, ".png");
                imagepath = path_1.default.join(__dirname, "../../../images/".concat(filename));
                filename_output = "".concat(req.query.filename, "-").concat(req.query.width, "x").concat(req.query.height, ".png");
                output = path_1.default.join(__dirname, "../../../thumbs/".concat(filename_output));
                check_highet = isNumeric(req.query.height);
                check_width = isNumeric(req.query.width);
                //check if there is file name or not
                if (((_a = req.query.filename) === null || _a === void 0 ? void 0 : _a.length) == 0 || req.query.filename == undefined) {
                    return [2 /*return*/, res.status(404).json({ error: 'invalid file name' })];
                }
                //check if there is height name or not
                if (check_highet == false || ((_b = req.query.height) === null || _b === void 0 ? void 0 : _b.length) == 0 || req.query.height == undefined) {
                    return [2 /*return*/, res.status(404).json({ error: 'invalid Height name' })];
                }
                //check if there is height name or not
                if (check_width == false || ((_c = req.query.width) === null || _c === void 0 ? void 0 : _c.length) == 0 || req.query.width == undefined) {
                    return [2 /*return*/, res.status(404).json({ error: 'invalid Width name' })];
                }
                return [4 /*yield*/, get_path_name(filename, directoryPath_image)];
            case 1:
                check_path_name_for_image_dir = _d.sent();
                return [4 /*yield*/, get_path_name(filename_output, directoryPath_thumbs)];
            case 2:
                check_path_name_for_thumbs_dir = _d.sent();
                if (check_path_name_for_thumbs_dir) {
                    return [2 /*return*/, res.status(200).sendFile(path_1.default.resolve(output))];
                }
                if (!check_path_name_for_image_dir) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, utilities_1.resizeImage)(imagepath, Number(req.query.width), Number(req.query.height), output)];
            case 3:
                get_resizeImage = _d.sent();
                if (get_resizeImage == true) {
                    return [2 /*return*/, res.status(200).sendFile(path_1.default.resolve(output))];
                }
                else {
                    return [2 /*return*/, res.status(500).json('Error Resizeing Image')];
                }
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(404).json("Image Not Found")];
            case 5: return [2 /*return*/];
        }
    });
}); });
function get_path_name(path_name, dir_name) {
    return __awaiter(this, void 0, void 0, function () {
        var files, file, check_file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('path_name: ', path_name);
                    console.log('dir_name: ', dir_name);
                    return [4 /*yield*/, fs_1.promises.readdir(dir_name)];
                case 1:
                    files = _a.sent();
                    file = files.find(function (file) { return file.includes(path_name); });
                    check_file = files.includes(path_name);
                    if (check_file) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.get_path_name = get_path_name;
;
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
exports.default = images;
