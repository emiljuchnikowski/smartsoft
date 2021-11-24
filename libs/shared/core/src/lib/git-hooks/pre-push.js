const osvar = process.platform;

if (osvar === "darwin" || osvar === "win64") {
    require("openurl").open("https://yt.smartsoft.biz.pl/timesheets");
    require("openurl").open("https://yt.smartsoft.biz.pl/agiles");
}
