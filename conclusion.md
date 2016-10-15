# Conclusion

## How long did it take?

I made a goal to complete it within three hours, but at that point I hadn't touched the CSS and was running into a lot of speed bumps with the location auto fill. While I had most of it complete, I wanted to finish the basic requirements at least. The following day I spent another 2 hours hashing out the rest of the location auto fill, tweaking validation, and adding extremely basic CSS.

## What did you want to add, but didn't have time?/What would you do to make it suitable for production use?

Items I would have still liked to work on were: 

- Add logic with what to do with form data when submit button was clicked
- A lot more CSS
- Validation for number of rooms, adult, and children dropdowns
- Better validation for if the user wants to type in their own location instead of clicking a suggestion or pressing enter to auto fill the location input

## What would you do to make it more suitable for high traffic scenarios?

I would probably change how I did Ajax calls since they happened after every keystroke excluding the first 2. That is a lot of calls out and probably unnecessary. 

I would also use Angular or some other library since their logic is most likely more efficient than what I have made.
