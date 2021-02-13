# @smartsoft00/schematics

##Install

`npm i @smartsoft001/schematics`

To add @smartsoft001/schematics to existing Angular CLI project, use:

`ng add @smartsoft001/schematics`

##Default Schematics Collection

To use @smartsoft001/schematics as the default collection in your Angular CLI project, add it to your angular.json:

`ng config cli.defaultCollection @smartsoft001/schematics`

##Usage

### Generate shared library

`ng g library [name] [type=default]`

Parameters:
<table>
    <tr>
        <td>name</td>
        <td>Library name</td>
    </tr>
    <tr>
        <td>type</td>
        <td>
            Type of library (default: default)
            <ul>
                <li>angular - angular library</li>
                <li>default - nodejs library</li>
            </ul>        
        </td>
    </tr>
</table>