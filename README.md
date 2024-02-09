# share-on-mastodon

A customizable "Share on Mastodon" button. The goal in making this web component
was to create a simple "Share on Mastodon" button people could easily add to the
bottom of their blog posts or project pages. It is customizable if you would
like but doesn't need custom styles to look good.

## Install

To install this component all you need to do is add this script tag
to the bottom of your page:

```html
<script defer type="module" src="https://cdn.jsdelivr.net/npm/@micahilbery/share-on-mastodon@1.2.0/share-on-mastodon.min.js"></script>
```

## Usage

After installation all you need to do is insert the custom element into your
html with:

```html
<share-on-mastodon></share-on-mastodon>
```

to customize the markup and shared message you can use the custom attributes.
For example:

```html
<share-on-mastodon data-share-title="Your Title"
                   data-share-description="This is a really descriptive description."
                   data-hashtags="#gottaHaveThoseHashtags #hashtag #mastodon"
                   data-author="@yourusername@yourinstance.social"
                   data-default-url="https://yourinstance.social">
</share-on-mastodon>
```

to customize the styles you can set the css variables. I recommend creating a
class and set the css variables in it. Then give the custom element that class.

```css
.your-custom-class {
  --mastodon-btn-bg: #BE185D;
  --mastodon-btn-border: 1px solid #831843;
  --mastodon-btn-rad: 1000px;
  --mastodon-btn-txt: #E5E7EB;
}
```

```html
<share-on-mastodon class="your-custom-class"
                   data-share-title="Your Title"
                   data-share-description="This is a really descriptive description."
                   data-hashtags="#gottaHaveThoseHashtags #hashtag #mastodon"
                   data-author="@yourusername@yourinstance.social"
                   data-default-url="https://yourinstance.social">
</share-on-mastodon>
```

## Custom Attributes

- `data-share-title` - Adds a title to the shared message body.
- `data-share-description` - Adds a description to the shared message body.
- `data-hashtags` - Adds hashtags to the shared message body. space separated (ex: `data-hashtags="#hashtag1 #hashtag2"`)
- `data-author` - Adds a mastodon username to the shared message body.
- `data-default-url` - The url used for the placeholder text of the modal input.
- `data-button-text` = Sets the text of the main button.
- `data-modal-heading` - Sets the text of the modal heading.
- `data-modal-text` - Sets the modal's text.
- `data-jargon-text` - Set the text under the input explaining what an instance is.
- `data-share-text` - Sets the text of the modal button.

## Custom slots

- `button` - Replace the default button with your own.
  ```html
  <share-on-mastodon>
    <button slot="button">My own button</button>
  </share-on-mastodon>
  ```

## Custom Styles

- `--mastodon-focus-ring` - Sets the outline for the focus states.
- `--mastodon-url-valid` - Sets the outline of the input when it's valid.
- `--mastodon-url-invalid` - Sets the outline of the input when it's invalid.
- `--mastodon-btn-bg` - Sets the buttons' backgound color.
- `--mastodon-btn-border` - Sets the buttons' border.
- `--mastodon-btn-rad` - Sets the buttons' border radius.
- `--mastodon-btn-txt` - Sets the buttons' text color.
- `--mastodon-modal-bg` - Sets the modal's background color;
- `--mastodon-modal-border` - Sets the modal's border.
- `--mastodon-modal-rad` - Sets the modal's border radius.
- `--mastodon-modal-txt` - Sets the modal's text color.
- `--mastodon-modal-txt-alt` - Sets the color of the placeholder text.
- `--mastodon-input-bg` - Sets the input's backgound color.
- `--mastodon-input-border` - Sets the input's border.
- `--mastodon-input-rad` - Sets the input's border radius.
- `--mastodon-input-txt` - Sets the input's text color.
- `--mastodon-close-bg` - Sets the modal close button;s background color.
- `--mastodon-close-border` - Sets the modal close button's border.
- `--mastodon-close-rad` - Sets the modal close button's border radius.
- `--mastodon-backdrop-blur` - Sets the blur of the content behind the modal.
