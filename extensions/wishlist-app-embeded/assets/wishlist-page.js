localStorage.setItem("WishlistItems",JSON.stringify([]));
let wishlists = JSON.parse(localStorage.getItem("WishlistItems"));
let themeId;
console.log("page title", localStorage.getItem("FormBuilderAppPageTitle"));
console.log("Access hello", __st.cid);
async function getMainThemeId() {
    await fetch("/admin/api/2023-04/themes.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the ID of the theme with role "main"
        const themes = data.themes;
        const mainTheme = themes.find((theme) => theme.role === "main");
        console.log(themes);
        console.log("Main theme ID", mainTheme.id);
        themeId = mainTheme.id;
        console.log("theme id", themeId);
        return themeId;
      })
      .catch((error) => {
        console.error("Error fetching themes:", error);
      });
  }
  // getMainThemeId();
  const createWishlistPage = async () => {
    const accessToken = "shpua_5f5b9cada0b62ffed51ed7b081989bed"; // Replace with your access token
    const pageHandle = "wishlist"; // Replace with the handle of the wishes page
  
    try {
      const createResponse = await fetch(`/admin/api/2023-04/pages.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify({
          page: {
            title: "Wishlist",
            handle: pageHandle,
            body_html: "<h1>Wishlist Items</h1>",
            published: true,
            template_suffix: "wisheslist-page",
          },
        }),
      });
  
      if (createResponse.ok) {
        const pageData = await createResponse.json();
        console.log("Wishlist page created:", pageData);
      } else {
        console.error(
          "Failed to create wishlist page:",
          createResponse.status,
          createResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error creating wishlist page:", error);
    }
  };
  createWishlistPage();
  async function createThemeTemplate() {
    const accessToken = "shpua_5f5b9cada0b62ffed51ed7b081989bed";
    // const themeId = 148606124317;
    const themeIds = await getMainThemeId();
    console.log("theme idsss in create is also", themeIds);
    const templateKey = "layout/wishlist-template.liquid";
    const templateContent = `
    {{ 'section-contact-form.css' | asset_url | stylesheet_tag }}
  
  {%- style -%}
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
      padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
    }
  
    @media screen and (min-width: 750px) {
      .section-{{ section.id }}-padding {
        padding-top: {{ section.settings.padding_top }}px;
        padding-bottom: {{ section.settings.padding_bottom }}px;
      }
    }
  {%- endstyle -%}
  
  <div class="color-{{ section.settings.color_scheme }} gradient">
    <div class="contact page-width page-width--narrow section-{{ section.id }}-padding">
      {%- if section.settings.heading != blank -%}
        <h2 class="title title-wrapper--no-top-margin inline-richtext {{ section.settings.heading_size }}">
          {{ section.settings.heading }}
        </h2>
      {%- else -%}
        <h2 class="visually-hidden">{{ 'templates.contact.form.title' | t }}</h2>
      {%- endif -%}
      {%- form 'contact', id: 'ContactForm', class: 'isolate' -%}
        {%- if form.posted_successfully? -%}
          <h2 class="form-status form-status-list form__message" tabindex="-1" autofocus>
            {% render 'icon-success' %}
            {{ 'templates.contact.form.post_success' | t }}
          </h2>
        {%- elsif form.errors -%}
          <div class="form__message">
            <h2 class="form-status caption-large text-body" role="alert" tabindex="-1" autofocus>
              {% render 'icon-error' %}
              {{ 'templates.contact.form.error_heading' | t }}
            </h2>
          </div>
          <ul class="form-status-list caption-large" role="list">
            <li>
              <a href="#ContactForm-email" class="link">
                {{ form.errors.translated_fields.email | capitalize }}
                {{ form.errors.messages.email }}
              </a>
            </li>
          </ul>
        {%- endif -%}
        <div class="contact__fields">
          <div class="field">
            <input
              class="field__input"
              autocomplete="name"
              type="text"
              id="ContactForm-name"
              name="contact[{{ 'templates.contact.form.name' | t }}]"
              value="{% if form.name %}{{ form.name }}{% elsif customer %}{{ customer.name }}{% endif %}"
              placeholder="{{ 'templates.contact.form.name' | t }}"
            >
            <label class="field__label" for="ContactForm-name">{{ 'templates.contact.form.name' | t }}</label>
          </div>
          <div class="field field--with-error">
            <input
              autocomplete="email"
              type="email"
              id="ContactForm-email"
              class="field__input"
              name="contact[email]"
              spellcheck="false"
              autocapitalize="off"
              value="{% if form.email %}{{ form.email }}{% elsif customer %}{{ customer.email }}{% endif %}"
              aria-required="true"
              {% if form.errors contains 'email' %}
                aria-invalid="true"
                aria-describedby="ContactForm-email-error"
              {% endif %}
              placeholder="{{ 'templates.contact.form.email' | t }}"
            >
            <label class="field__label" for="ContactForm-email">
              {{- 'templates.contact.form.email' | t }}
              <span aria-hidden="true">*</span></label
            >
            {%- if form.errors contains 'email' -%}
              <small class="contact__field-error" id="ContactForm-email-error">
                <span class="visually-hidden">{{ 'accessibility.error' | t }}</span>
                <span class="form__message">
                  {%- render 'icon-error' -%}
                  {{- form.errors.translated_fields.email | capitalize }}
                  {{ form.errors.messages.email -}}
                </span>
              </small>
            {%- endif -%}
          </div>
        </div>
        <div class="field">
          <input
            type="tel"
            id="ContactForm-phone"
            class="field__input"
            autocomplete="tel"
            name="contact[{{ 'templates.contact.form.phone' | t }}]"
            pattern="[0-9\-]*"
            value="{% if form.phone %}{{ form.phone }}{% elsif customer %}{{ customer.phone }}{% endif %}"
            placeholder="{{ 'templates.contact.form.phone' | t }}"
          >
          <label class="field__label" for="ContactForm-phone">{{ 'templates.contact.form.phone' | t }}</label>
        </div>
        <div class="field">
          <textarea
            rows="10"
            id="ContactForm-body"
            class="text-area field__input"
            name="contact[{{ 'templates.contact.form.comment' | t }}]"
            placeholder="{{ 'templates.contact.form.comment' | t }}"
          >
            {{- form.body -}}
          </textarea>
          <label class="form__label field__label" for="ContactForm-body">
            {{- 'templates.contact.form.comment' | t -}}
          </label>
        </div>
        <div class="contact__button">
          <button type="submit" class="button">
            {{ 'templates.contact.form.send' | t }}
          </button>
        </div>
      {%- endform -%}
    </div>
  </div>`;
    console.log("ID", themeId);
    try {
      const createResponse = await fetch(
        `/admin/api/2023-01/themes/${themeId}/assets.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": accessToken,
          },
          body: JSON.stringify({
            asset: {
              key: "templates/page.wishlist-template.liquid",
              value: `
            
            <div id="page">
            <h1>Your Wishlist</h1>
            <div id='productContainer'></div>
            <button class="move-to-cart-button">Move to Cart</button>
          </div>`,
            },
          }),
        }
      );
      // console.log(createResponse.body)
      if (createResponse.ok) {
        console.log("Template created successfully");
      } else {
        console.error(
          "Failed to create template:",
          createResponse.status,
          createResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error creating template:", error);
    }
  }
  
  createThemeTemplate();
  
  const updatePage = async () => {
    const accessToken = "shpua_5f5b9cada0b62ffed51ed7b081989bed"; // Replace with your access token
    const pageHandle = "wishlist"; // Replace with the handle of the wishes page
  
    try {
      const response = await fetch(
        `/admin/api/2023-01/themes/148606124317/assets.json?asset[key]=templates/page.wishlist-template.liquid`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": accessToken,
          },
        }
      );
      // console.log(response)
      const pages = await response.json();
      // console.log(pages)
      // console.log(pageId);
      let productListHTML = "";
      for (const product of wishlists) {
        productListHTML += `
        <div style="position: relative; margin: 10px;">
        <button data-product-id="${product.id}" style="position: absolute; top: 0; right: 0;"
        onclick=removeProductFromWishlist(${product.id})>X</button>
        <img src="${product.image.src}" style="width: 200px; height: auto;" /><br/>
        <h2>${product.title}</h2>
        <br/>
        <h3>${product.variants[0].price}</h3>
        <br/>
        <button class="move-to-cart-button" data-product-title="${product.title}">Move to Cart</button>
        </div>`;
      }
      console.log('wishlists',wishlists);
      let wishItems= JSON.stringify(wishlists);
      const pageData = {
        asset: {
          key: pages.asset.key,
          value: `<div id=\"page\">\n<h1>Wishlist Items</h1>\n<div id='productContainer'
          style="display:flex">${productListHTML}</div>\n</div>
          <script>
          const moveButtons = document.getElementsByClassName(
            "move-to-cart-button"
            );
            console.log('cart',moveButtons);
            for (let i = 0; i < moveButtons.length; i++) {
              const button = moveButtons[i];
              const productTitle = button.getAttribute("data-product-title");
              button.addEventListener("click", () => {
                alert(productTitle);
              });
            }
            console.log('Items 340', ${JSON.stringify(wishlists)});
          </script>`,
        },
      };
  
      const updateResponse = await fetch(
        `/admin/api/2023-01/themes/${pages.asset.theme_id}/assets.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": accessToken,
          },
          body: JSON.stringify(pageData),
        }
      );
  
      if (updateResponse.ok) {
        console.log("Template  updated successfully");
        
      } else {
        console.error(
          "Failed to update page:",
          updateResponse.status,
          updateResponse.statusText
        );
      }
    } catch (error) {
      console.error("Errors updating page:", error);
    }
  };  
  export {getMainThemeId,updatePage,createWishlistPage,createThemeTemplate};