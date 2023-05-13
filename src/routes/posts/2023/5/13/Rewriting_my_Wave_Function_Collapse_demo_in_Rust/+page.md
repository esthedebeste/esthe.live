# Rewriting my Wave Function Collapse demo in Rust

The process behind wfc-live.esthe.live

## The original

I first wrote a Wave Function Collapse algorithm in C++ in April 2022 (around a year ago!), and decided to make a little [online demo](https://old-wfc.esthe.live) for it. It was a fun little project that I made in a few days, and I was pretty happy with the result. I made the demo because I thought it looked cool! The demo works by prerendering 1000 20x20 images, each with three possible colors and four random rules. I remember showing it to someone, and the first question was "is it live-generated?" And it was really embarrassing to say that it wasn't.

## Fast forward to like. Two weeks ago

I was on vacation in Italy! It was really pretty there :3<br>
When I was there, I had a little tablet-laptop thing. As you might figure, the coding experience on Windows/arm64 is tough. So I made the only logical decision, and set up a Microsoft Azure VM with a VS Code remote tunnel connection. <small>Shoutout MS for giving me 100$ of credit because I'm a student fr (any students in the chat. check out the [github student pack](https://education.github.com/pack). a bunch of companies give out free stuff, including domain names & cloud credits).</small>

I thought back to that embarrassing moment. Also, the UI really didn't look that good. So. Rust time! And if we're gonna go rust, we might as well go full rust. I looked at some stuff, and decided [Sycamore](https://sycamore-rs.netlify.app/) was for me. I 💜 reactivity fr.

### Rewrite time

Okay. It's a pretty small algorithm. I have [C++ code that already implements it](https://github.com/esthedebeste/WaveFunctionCollapse). How hard could it be?

Difficult! Difficult.

Getting a random number is already 2 dependencies, my panics were unintelligable (+1 dependency fixes that), and web-sys makes you mark every used DOM feature in your Cargo.toml (?????).

Cargo aside, rust's type system made it considerably more difficult to port. To avoid any unnecessary heap allocations, the collapse function `(x, y, chosen) -> options to close` was actually implemented by passing the collapser to the function, so that the function could call `wfc->remove_option(x, y, option)` and recurse. Rust didn't let me do this because memory safety&trade;. I slapped a `Vec<Collapse>` as the return type and it worked.

Except it reintroduced the problem that I avoided in the C++ codebase and forgot about, which is a whole bunch of repeated heap allocations. Which made the whole rewrite much slower! 2 seconds on my PC, 7.5s on my phone. Not good. Fun fact, in the first two weeks of this project being live, the initial image was actually prerendered as a `background-image: url(base64-png)` in the CSS. ([sorry saff](https://twitter.com/offbrandsaffron/status/1653442600546729990))

Today I decided to fix that. Thankfully, the entire rust community is obsessed with performance, and it's pretty easy to publish your own crate! `ArrayVec<Collapse, 9>` ftw! It's a fixed-max-size array that can be used like a Vec, but it doesn't allocate on the heap. It's perfect for this use case! Took the generation time to `<0.25` seconds on pc, and `<2` seconds on phone. I'm happy with that. Especially because I also figured out how to display a "Generating..." message.

### The UI

SCSS built into trunk (the little build tool)?? How could I _not_ use it. A little gradient background, drop shadows, rules in emojis (because I'm a gen z, and it also avoids information location shift, i guess (+ 🟨 is faster to read than "yellow")), and a little "Generating..." message. I'm happy with it. ⬇️

<iframe title="WFC Demo Preview" src="https://wfc.esthe.live" style="width: 100%; aspect-ratio: 1.2;"></iframe>

_2023-5-13_

<style>
    iframe {
        border-radius: 10px;
        border: none;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        margin: auto;
    }
</style>
