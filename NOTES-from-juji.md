# This is notes from juji

So, out of humility and shame, i've updated the ui..

this is free, because i feel shame

hehe..


## This update consist of:

- adding `tunnel` command in package.json, usefull for checking out in safari, because it only wants to see https
- fix the radar, it get skewed after browser resize in "lookout" page
- some cosmetics update:
  - using `cursor: hand` where ever i see fit (buttons)
  - vector and scale button in "radar" is now bigger (compatible with thumb, i guess)
  - bottom menu button styling
  - layouts for "radar" and "rules"
  - radar size is now more fluid. it fills up the screen.
  - instrument sizing on smaller screen at "lookout"
  - input styling on "rules"

## notes

Sometimes the tunnel doesn't work.. in that case, try again a few more times..
If you're tired of trying and trying again, try [ngrok](https://ngrok.com/).


So, i notice from this app, and your presentation today...

The way we create apps, should be Mobile First.

[https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00](https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00)

That's just the way people do it, nowadays..

Maybe because people use mobiles more than laptops..

How does it reflect in our way of creating app?

In css, we write for mobile, and then use media query to adhere to larger screen.

I personally think it's better: we start with minimal things, and add to it.

