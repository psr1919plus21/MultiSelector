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

Settings
-------
Here an example of initialisation *MultiSelector* with settings.

    new MultiSelector({
      el: document.querySelector('.ms-select-custom-icon'),
      settings: {
        titleIconClose: 'src/img/bomb.svg',
        titleIconOpen: 'src/img/explosion.svg',
        dropdownNoFlow: true,
        keepOpenByAreaClick: true,
        dropdownUp: true,
        selectedSeparator: 'from',
        allSelectedPlaceholder: 'you select all cats',
        selectAll: false,
        selectAllText: 'Select all'
      }
    });

 **titleIconClose** – *URL string*, define custom icon for closed *MultiSelector*

 **titleIconOpen** - *URL string*, define custom icon for open *MultiSelector*

 **dropdownNoFlow** - If true places dropdown over content, if false content bellow will be offset on dropdown height.

 **keepOpenByAreaClick** - If false dropdown will be close by clicking  on any DOM element on the page, if true dropdown will be close by clicking on itself only.

 **dropdownUp** – If true dropdown will be expanded up to select title, if false it will be droped down in default style. False by default.

 **selectedSeparator** – String that separate count of selected and total values, by default – 'of'.

 **allSelectedPlaceholder** – String that appears if all values will be selected.

 **selectAll** – This option include select all button before all your select items.
 
 **selectAllText** – This string define select all button text.



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

Methods
---------

*MultiSelector* instance has the following methods:

`getValue` – return an array with selected items.

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
