/*
 *
 * Copyright 2025,2026 HCL America, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * /
 */

'use strict';

const decodeHtml = require('../src/utils/decodeHtml');

describe('decodeHtml', () => {
    test('decodes &#34; to double-quote character', () => {
        expect(decodeHtml('Missing &#34;Referrer policy&#34; Security Header'))
            .toBe('Missing "Referrer policy" Security Header');
    });

    test('decodes &#39; to single-quote / apostrophe', () => {
        expect(decodeHtml('It&#39;s a test')).toBe("It's a test");
    });

    test('decodes &#38; to ampersand', () => {
        expect(decodeHtml('A &#38; B')).toBe('A & B');
    });

    test('decodes &#60; and &#62; to angle brackets', () => {
        expect(decodeHtml('&#60;script&#62;')).toBe('<script>');
    });

    test('decodes &amp; named entity to ampersand', () => {
        expect(decodeHtml('Tom &amp; Jerry')).toBe('Tom & Jerry');
    });

    test('decodes &lt; and &gt; named entities', () => {
        expect(decodeHtml('&lt;div&gt;')).toBe('<div>');
    });

    test('decodes &quot; named entity to double-quote', () => {
        expect(decodeHtml('say &quot;hello&quot;')).toBe('say "hello"');
    });

    test('leaves plain text unchanged', () => {
        expect(decodeHtml('no entities here')).toBe('no entities here');
    });

    test('returns empty string unchanged', () => {
        expect(decodeHtml('')).toBe('');
    });

    test('leaves unknown numeric entities unchanged', () => {
        // &#9999; is not in the known-entities map
        const input = 'char &#9999; here';
        expect(decodeHtml(input)).toBe(input);
    });
});
