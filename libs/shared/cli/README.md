# @smartsoft001/cli

This library allow generate dynamic code.

## Install

`npm install @smartsoft001/cli -g` 

##  Usage

### Prepare system

Preparing operating system dependencies to work with the framework.

`smart prepare`

### Create project

`smart init --name [name]`

Parameters:
<table>
    <tr>
        <td>--name (alias: -n)</td>
        <td>Project name</td>
    </tr>
</table>

### Generate shared library

`smart generate library [name] [--type=default]`

alias:

`smart g lib [name] [--type=default]`

Parameters:
<table>
    <tr>
        <td>name</td>
        <td>Library name</td>
    </tr>
    <tr>
        <td>--type</td>
        <td>
            Type of library (default: default)
            <ul>
                <li>angular - angular library</li>
                <li>default - nodejs library</li>
            </ul>        
        </td>
    </tr>
</table>

### Generate domain

`smart generate domain`

alias:

`smart g domain [name]`

Parameters:
<table>
    <tr>
        <td>name</td>
        <td>Domain name</td>
    </tr>
</table>
