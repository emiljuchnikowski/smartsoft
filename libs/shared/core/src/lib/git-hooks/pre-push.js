const osvar = process.platform;

if (osvar === "darwin" || osvar === "win64") {
    require("openurl").open("https://smartsoft.biz.pl");
}
