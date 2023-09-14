
# NEXT.js Static Page Localizer

# WARNING !!! Currently broken. Working on fix

### Introdduction

This is a package for creating localized NEXT.js applications that runs as Static Web Pages. While static web pages are cheap, easy to use and great, they lack some functionality to support some of the more poular localization packages.

We have created this package to help users easily introduce localization on their web apps as easily as possible. Keep on reading to learn more of how this works.

## How to Use

### Install

```bash
npm i nextjs-static-page-localizer
```

## Add required files

At your root you need to create a folder called `messages` and this should contain a file called `config.json` and a `.json` file for each language you aim to support.

### Configure config.json

You should configure the config file as shown under. You need to specify a default language (specified by code) and then all the languages you support (including default). The languages need to be specified with `code` and `name`.  

```json
{
    "default": "en",
    "languages": [
        {
            "code": "en",
            "name": "English"
        },
        {
            "code": "fr",
            "name": "French"
        }
    ]
}
```

### Configure a Language file

Each language file should be on the format `<code>.json` and placed in the messages folder, where `<code>` is the same as the code of the language in the `config.json` file.

```json
{
    "home": {
        "title": "Hello!",
        "welcome": "Welcome traveler! Be a guest on my site!"
    },
    "some-section": {
        "some-field": "Some content",
        "some-other-field": "Some other content"
    },
    // Under is specifically for metadata, which has a kinda protected name
    "metadata": {
        "home-title": "Title on home-page",
        "home-description": "This is a description of the home page",
        "some-section-title": "Some other title", 
        "some-section-description": "Some other description"
    } 
}
```

### Example of a setup

Given that we want to have support for the languages English and Spanish, a setup could look like this.

**The folder structure**

```
| .
|--- src
|   |--- <your source code>
|--- messages
|   |--- config.json
|   |--- en.json
|   |--- es.json
| package.json
| ...
```

**config.json**
```json
{
    "default": "en",
    "languages": [
        {
            "code": "en",
            "name": "English"
        },
        {
            "code": "es",
            "name": "Spanish"
        }
    ]
}
```

**en.json**
```json
{
    "home": {
        "welcome": "Welcome message",
        "about": "Some description"
    },
    "metadata": {
        "home-title": "Some title for the home page",
        "home-description": "Some description for the home page"
    }
}
```

**es.json**
```json
{
    "home": {
        "welcome": "Welcome message in spanish",
        "about": "Some description in spanish"
    },
    "metadata": {
        "home-title": "Some title for the home page in spanish",
        "home-description": "Some description for the home page in spanish"
    }
}
```

### Using the content in components

So far we've talked about how to create the structure. Now we will talk about how to use the content in our app.

As you might have noticed all the content is seperated in sections. This is to make it more easily organized and to create some logic to seperate different pages in your app.

The component makes use of the query parameter `lang` to decide what language it should use. If this is not set it uses the default language that is specified.

```ts
// Neccesary
"use client";

import React, { useState } from "react";
// Import translations fetcher
import { useTranslationsFetcher } from "nextjs-static-page-localizer";

function YourComponent(){
    // Fetch translations
    const translations = useTranslationsFetcher();
    // Select a section by name
    const home_section = translations("home");

    // Use the section to get each element by the specified key
    return (
        <div>
            <h1>{home_section("title")}</h1>
            <p>{home_section("description")}</p>
        </div>
    )
}

export default YourComponent
```
#### Using HTML language setter

This package also support setting the `lang` section of the root `HTML` element. We will now add this to the code we made previously. This is quite easy to do, and it will specify the language as of the `?lang=<code>` section of the url. If it does not find this, it will specify the default language as the language of the page.

```ts
"use client";

import React, { useState } from "react";
// Add the language setter to the imports
import { useTranslationsFetcher, useLanguageSetter } from "nextjs-static-page-localizer";
function YourComponent(){
    const translations = useTranslationsFetcher();

    // Use the language setter
    useLanguageSetter();

    const home_section = translations("home");

    return (
        <div>
            <h1>{home_section("title")}</h1>
            <p>{home_section("description")}</p>
        </div>
    )
}

export default YourComponent
```
#### Specifying page metadata

In order to make even the title and description localized we can use the metadata setter to set the content of the header title and description as we have specified in our language files.

```ts
"use client";

import React, { useState } from "react";
// Add the metadata setter to the imports
import { useTranslationsFetcher, useLanguageSetter, useMetadataSetter } from "nextjs-static-page-localizer";
function YourComponent(){
    const translations = useTranslationsFetcher();

    useLanguageSetter();
    // Use the metadata setter by specifying the sections it should use
    useMetadataSetter("home-title", "home-description");

    const home_section = translations("home");

    return (
        <div>
            <h1>{home_section("title")}</h1>
            <p>{home_section("description")}</p>
        </div>
    )
}

export default YourComponent

```