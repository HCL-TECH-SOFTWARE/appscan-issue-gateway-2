const decodeHtml = (htmlText) => {
    const knownEntities = {
        '&#33;': '!',  // Exclamation mark
        '&#34;': '"',  // Double quotation mark
        '&#35;': '#',  // Number sign (hash)
        '&#36;': '$',  // Dollar sign
        '&#37;': '%',  // Percent sign
        '&#38;': '&',  // Ampersand
        '&#39;': "'",  // Apostrophe (single quote)
        '&#40;': '(',  // Left parenthesis
        '&#41;': ')',  // Right parenthesis
        '&#42;': '*',  // Asterisk
        '&#43;': '+',  // Plus sign
        '&#44;': ',',  // Comma
        '&#45;': '-',  // Hyphen-minus
        '&#46;': '.',  // Full stop (period)
        '&#47;': '/',  // Solidus (slash)
        '&#48;': '0',  // Digit zero
        '&#49;': '1',  // Digit one
        '&#50;': '2',  // Digit two
        '&#51;': '3',  // Digit three
        '&#52;': '4',  // Digit four
        '&#53;': '5',  // Digit five
        '&#54;': '6',  // Digit six
        '&#55;': '7',  // Digit seven
        '&#56;': '8',  // Digit eight
        '&#57;': '9',  // Digit nine
        '&#58;': ':',  // Colon
        '&#59;': ';',  // Semicolon
        '&#60;': '<',  // Less-than sign
        '&#61;': '=',  // Equals sign
        '&#62;': '>',  // Greater-than sign
        '&#63;': '?',  // Question mark
        '&#64;': '@',  // At symbol
        '&#91;': '[',  // Left square bracket
        '&#92;': '\\', // Backslash
        '&#93;': ']',  // Right square bracket
        '&#94;': '^',  // Circumflex accent
        '&#95;': '_',  // Low line (underscore)
        '&#96;': '`',  // Grave accent
        '&#123;': '{', // Left curly bracket
        '&#124;': '|', // Vertical bar
        '&#125;': '}', // Right curly bracket
        '&#126;': '~', // Tilde

        // Non-breaking space (often used in HTML)
        '&#160;': ' ',

        // Currency symbols
        '&#163;': '£', // Pound sign
        '&#165;': '¥', // Yen sign
        '&#8364;': '€', // Euro sign

        // Other common characters
        '&#169;': '©', // Copyright symbol
        '&#174;': '®', // Registered trademark symbol
        '&#183;': '·', // Middle dot


        // Named entities (more commonly used for these)
        '&nbsp;': ' ', // Non-breaking space
        '&amp;': '&', // Ampersand
        '&lt;': '<', // Less-than sign
        '&gt;': '>', // Greater-than sign
        '&quot;': '"', // Quotation mark
        '&apos;': "'", // Apostrophe
    };

    return htmlText.replace(/&#\d+;/g, (match) => knownEntities[match] || match);

};

module.exports = decodeHtml;