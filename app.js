const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("conncted to DB");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));// data pass


app.get("/",(req, res) => {
    res.send("hi , i am root");
});

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
});

//new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});


//show route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

app.post("/listings", async (req, res ) => {
    // let listing = req.body.listing;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    // console.log(listing);
});

// app.get("/testListing", async (req,res) => {
//     let samplelisting = new Listing ({
//         title : "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "calagute, goa",
//         country: "india",
//     });
//     await samplelisting.save();
//     // console.log("smaple was saved ");
//     console.log(samplelisting);

//     res.send("success");
// });



app.listen(8080, () => { 
    console.log("server is listen");
});