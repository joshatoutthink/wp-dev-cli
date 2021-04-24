#!/usr/bin/env node

import router from "./router";
import { argParse } from "./argParse";

router(argParse());
