const express=require("express");
const dotenv=require("dotenv");
const cors =require("cors")
const mongoose=require("mongoose");

const PORT=5000;

const app=express();
app.use(express.json());

dotnev.config();