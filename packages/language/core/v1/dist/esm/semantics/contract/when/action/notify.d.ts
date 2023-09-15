import * as t from "io-ts/lib/index.js";
import { Observation } from "../../common/observations.js";
export type Notify = {
    notify_if: Observation;
};
export declare const Notify: t.Type<Notify>;
