MultiSelector
=====
This is pure-js plugin that allow you turn an awful native selects to total customisable user friendly elements in few simple steps.

Get MultiSelector
----------
In order to run *MultiSelector* in your project you need to install it.
Here several ways to get *MultiSelector*,  choose one:

**download**

    download stuff here

**npm**

    npm installation stuff here

**bower**

    bower installation stuff here


Usage
---------
In order to initialise you select with *MultiSelector*  you need to grab it by selector and invoke *MultiSelector* constructor.

**Example:**

    <select class="example-classname">
       <option  value="" disabled selected>Select your turtle</option>
       <option value="donatello">Donatello</option>
       <option value="leonardo">Leonardo</option>
       <option value="michelangelo">Michelangelo</option>
       <option value="raphael">Raphael</option>
     </select>

     <script>
       new MultiSelector({
         el: document.querySelector('.example-classname')
      });
     </script>

After this native select will be hidden and *MultiSelector* will be inserted right before native select element.

***MultiSelector*'s constructor take two arguments**:

 1. element selector.
 2. object **settings** (optional).

You can add `ms-loading` class for your native selector element for specify apperance for it while *MultiSelector* loading. It keep apperance clear while page loading.
Styles for preload native select state can look like this:

      .ms-loading {
        min-height: 40px;
        background: rgba(255,255,255,0);
        border: 2px solid #444;
        border-top-color: #999;
        border-right-color: #999;
        width: 40px;
        display: block;
        font-size: 0;
        border-radius: 50%;
        -webkit-appearance: none;
        box-shadow: none;
        animation: spin 2s linear infinite;
        margin: 0 auto;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

Settings
-------
Here an example of initialisation *MultiSelector* with settings.

    new MultiSelector({
      el: document.querySelector('.your-selector-class-or-id'),
      settings: {
        allSelectedPlaceholder: 'All selected',
        selectedSeparator: 'of',
        dropdownNoFlow: false,
        keepOpenByAreaClick: false,
        dropdownUp: false,
        selectAll: false,
        selectAllText: 'Select all',
        unselectAllText: 'Unselect all',
        selectAllToggle: false,
        clearAll: false,
        clearAllText: 'Clear all',
        optgroupsToggle: true,
        optgroupsSeparator: ', ',
        onReady: function() {
          console.log('ready');
        }

        titleIconClose: 'src/img/bomb.svg',
        titleIconOpen: 'src/img/explosion.svg'
      }
    });

 **allSelectedPlaceholder** – String that appears if all values will be selected.

 **selectedSeparator** – String that separate count of selected and total values, by default – 'of'.

 **dropdownNoFlow** - If true places dropdown over content, if false content bellow will be offset on dropdown height.

 **keepOpenByAreaClick** - If false dropdown will be close by clicking  on any DOM element on the page, if true dropdown will be close by clicking on itself only.

 **dropdownUp** – If true dropdown will be expanded up to select title, if false it will be droped down in default style. False by default.

 **selectAll** – This option include select all button before all your select items.

 **selectAllText** – This string define select all button text.

 **unselectAllText** – This string define unselect all button text.

 **selectAllToggle** – If pressing select all button again all items will be unselected.

 **clearAll** – This option include clear all button on the top of dropdown.

 **clearAllText** – This option define clear all button text.

 **optgroupsToggle** – This option define toggling optgroups.

 **optgroupsSeparator** – This option define separator sign between selected optgroups.

 **titleIconClose** – *URL string*, define custom icon for closed *MultiSelector*

 **titleIconOpen** - *URL string*, define custom icon for open *MultiSelector*

 **onReady** – Callback function that be called after *MultiSelector* replace native selector.





Selector with `multiple` attribute.
---------
In order to initialise you select with a multiple attribute you need to just add this attribute to you select element, *MultiSelector* will do whole work underhood.

**Adding `multiple` attribute to select element will set keepOpenByAreaClick permanently true.**

**Example:**

    <select class="example-classname" multiple>
       <option  value="" disabled selected>Select your turtle</option>
       <option value="donatello">Donatello</option>
       <option value="leonardo">Leonardo</option>
       <option value="michelangelo">Michelangelo</option>
       <option value="raphael">Raphael</option>
     </select>

     <script>
       new MultiSelector({
         el: document.querySelector('.example-classname')
      });
     </script>

After this native select will be hidden and *MultiSelector* will be inserted right before native select element.


Selector with `optgroups`.
---------
*MultiSelector* allow you to create selects with items divided by optgroups. In order to initialise you select with optgroups you need to just add optgroups to you select element, *MultiSelector* will do whole work underhood.

**Example:**

    <select class=".example-classname" multiple>
      <option  value="" disabled selected>Select your pet</option>
      <optgroup label="Cats">
          <option value="Tom">Tom</option>
          <option value="garfield">Garfield</option>
          <option value="Sylvester">Sylvester</option>
          <option value="Jasper">Jasper</option>
      </optgroup>

      <optgroup label="dogs">
        <option value="spyke">Spyke</option>
        <option value="bethooween">Bethooween</option>
        <option value="rex">Rex</option>
        <option value="barboss">Barboss</option>
      </optgroup>

      <optgroup label="apes">
        <option value="bonobo">Bonobo</option>
      </optgroup>
    </select>
    <script>
       new MultiSelector({
         el: document.querySelector('.example-classname')
      });
    </script>

After this native select will be hidden and *MultiSelector* will be inserted right before native select element.

Methods
---------

*MultiSelector* instance has the following methods:

`getValue` – return an array with selected items.

`getValueAsString` – return selected items as string.

`isAllSelected` – return true if all items selected.


License
=======

Copyright (c) 2017 Philipp Gaponenko (psr1919plus21@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
