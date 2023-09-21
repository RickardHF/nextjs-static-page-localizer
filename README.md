
# NEXT.js Static Page Localizer

[![npm version](https://img.shields.io/npm/v/nextjs-static-page-localizer.svg?style=flat-square)](https://www.npmjs.com/package/nextjs-static-page-localizer)
![npm](https://img.shields.io/npm/dw/nextjs-static-page-localizer)
[![Package Quality](https://packagequality.com/shield/nextjs-static-page-localizer.svg)](https://packagequality.com/#?package=nextjs-static-page-localizer)

### What this offers
- Localization for your NEXT.js app
- Static Web App compatible
- Configurable
- Customizable UI-components
- Flexibility
- Head Title and Description Localization

### Introduction

This is a package for creating localized NEXT.js applications that runs as Static Web Pages. While static web pages are cheap, easy to use and great, they lack some functionality to support some of the more poular localization packages.

We have created this package to help users easily introduce localization on their web apps as easily as possible. Keep on reading to learn more of how this works.

## How to Use

### Get Started Easily

If you want to create a new project using this package, head over to the [template project](https://github.com/RickardHF/NEXT.js-Static-Page-Localizer-Template) we've created.

### Install

```bash
npm i nextjs-static-page-localizer
```

## Add required files

While technically you don't need to add extra files to your project for this, it is advisable to do so in order to keep your project more easily navigable, maintainable and easier to work with. Following from here, we will use our prefered way of setting this up, which closely resembles the way in which other localization/internationalization packages use.

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

```go
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

### Set up wrapper

In order for using the language files you've just created and make their contents available in all of your sub-modules, you need to initialize a wrapper in your `layout.tsx` file. 

```ts
import './globals.css'
// Import the wrapper and the Configuration class
import { LocalizerWrapper, Configuration } from 'nextjs-static-page-localizer'

// Load the configuration
const config = require('@/messages/config')

// Set up the default title and description
export const metadata = {
  title: 'Default Title',
  description: 'Default description',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {

  // Create the configuration object based on the loaded configuration
  const configuration = new Configuration(config.default, config.languages, config.messages)

  // Wrap the main section with the wrapper and pass in the configuration
  return (
    <html>
      <body>
        <LocalizerWrapper configuration={configuration}>
          <main>
            {children}
          </main>
        </LocalizerWrapper>
      </body>
    </html>
  )
}

```

For this we created an additional file in the messages folder to keep the code at the layout element cleaner, `config.js`, which loads the data from the files fo us. You could do the same or load the data in a similar manner directly to your layout element.

```ts
const config = require('./config.json');

const en = require('./en.json');
const no = require('./no.json');
const cs = require('./cs.json');

const messages = {
    "en": en,
    "no": no,
    "cs": cs
}

module.exports = {
    default: config.default,
    languages: config.languages,
    messages: messages
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
### Using HTML language setter

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
### Specifying page metadata

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


### Create a Link to other sub-pages

In your project you probably wither have, or will at some point need to have some sub-pages. When you have that you'll need some way to navigate between the pages. Given that we are using a query parameter for determining the prefered language this needs to be part of the link as your're going from one sub-page to another without loosing the setting. 

We have for this purpose created a link element that builds on the NEXT.js Link element, which handles this language setting for you. Under is an example of how that can be set up.

```ts
'use client'
// Import the translationsfetcher
import { useTranslationsFetcher } from "nextjs-static-page-localizer";
// Import the LocalizedLink component
import { LocalizedLink } from "nextjs-static-page-localizer/components";

export default function Header() {
    // Import the translations so that the links can have localized Labels as well
    const tranlations = useTranslationsFetcher();
    // Get the section in which you have the link names (not neccesarily the same as this)
    const link_names = tranlations("links");
    
    // Create the link elements 
    return (
        <header>
            <div className="menu">
                <LocalizedLink href="/">link_names("home")</LocalizedLink>
                <LocalizedLink href="/about">link_names("about")</LocalizedLink>
            </div>
        </header>
    );
}
```

### Create a Language Switcher

Now we'll also have to have a way to set the language so that the user can switch the language the page is in. We have also created a component that switches the languages while not changing the page that one currently is on. We will now expand on the last example to add the language setters. Here we'll do it dynamically based on the languages we have in our config, however you can create each component by it self if you wish to do so.

```ts
'use client'
// Import the language interface
import { Language } from "nextjs-static-page-localizer/interfaces";
// Import the useLocalization
import { useTranslationsFetcher, useLocalization } from "nextjs-static-page-localizer";
// Import the LanguageSwitcher component
import { LocalizedLink, LanguageSwitcher } from "nextjs-static-page-localizer/components";

export default function Header() {
    // Fetch the configuration
    const { configuration } = useLocalization();
    const tranlations = useTranslationsFetcher();
    const link_names = tranlations("links");
    
    // Create a component for each language dynamically based on the languages 
    return (
        <header>
            <div className="languages">
                {
                    configuration.languages.map((language:Language) => {
                        return (
                            <LanguageSwitcher
                                key={language.code}
                                lang={language.code}
                                >
                                <h4>{language.name}</h4>
                            </LanguageSwitcher>
                        );
                    })
                }
            </div>
            <div className="menu">
                <LocalizedLink href="/"><h2>link_names("home")</h2></LocalizedLink>
                <LocalizedLink href="/about"><h2>link_names("about")</h2></LocalizedLink>
            </div>
        </header>
    );
}
```

