As presented on the NNUG Meetup in Bergen 30. jan 2012

This just contains all modules right now, as I haven't checked them into
npm yet. 

I use the fantastic JSFeat library for face detection. The bbf-face-file is from that module

The PaVEParser is from the ar-drone module itself.

For getting the RGBA array I use ffmpeg, and got a lot of inspiration from @TooTallNate on getting that to run.

The last part is standard reactive extensions, thank you Microsoft for being awesome and making it open source and available for JavaScript

node testStream.js will connect to the drone and start writing detected faces to the console. Uncomment the lines about the drone, takeoff and land and you have a drone that takes off and will only land if it detects a face.
