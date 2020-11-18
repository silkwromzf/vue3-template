import { Module } from "vuex";
import { RootState } from ".";

export type ModuleState<T> = Module<T, RootState>;
