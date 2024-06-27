"use strict";(self.webpackChunklyrihkaesa_github=self.webpackChunklyrihkaesa_github||[]).push([[1682],{565:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>p,toc:()=>d});var a=n(85893),l=n(11151);const s={},i="Laravel Blade Template",p={id:"laravel/laravel-blade-template",title:"Laravel Blade Template",description:"Menggunakan @section() and @yield()",source:"@site/articles/learning/05-laravel/016-laravel-blade-template.md",sourceDirName:"05-laravel",slug:"/laravel/laravel-blade-template",permalink:"/learning/laravel/laravel-blade-template",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:16,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Plugin Filament Shield",permalink:"/learning/laravel/filament-v3-plugin-bezhansalleh-filament-shield"},next:{title:"Laravel Session",permalink:"/learning/laravel/session"}},o={},d=[{value:"Menggunakan <code>@section()</code> and <code>@yield()</code>",id:"menggunakan-section-and-yield",level:2},{value:"Menggunakan Blade Component",id:"menggunakan-blade-component",level:2},{value:"Mengubah <code>x-layout.app</code> menjadi <code>x-app-layout</code>",id:"mengubah-x-layoutapp-menjadi-x-app-layout",level:3},{value:"<code>@isset($variable)</code>",id:"issetvariable",level:2},{value:"<code>@stack(&#39;styles&#39;)</code>, <code>@stack(&#39;scripts&#39;)</code>, <code>@push(&#39;styles&#39;)</code>, dan <code>@push(&#39;scripts&#39;)</code>",id:"stackstyles-stackscripts-pushstyles-dan-pushscripts",level:2},{value:"Example Blade Component: <code>button</code>",id:"example-blade-component-button",level:2},{value:"Snippets Custom for Blade Component",id:"snippets-custom-for-blade-component",level:2},{value:"Tailwind Merge Laravel",id:"tailwind-merge-laravel",level:2},{value:"Snippets Custom for Blade Component twMarge",id:"snippets-custom-for-blade-component-twmarge",level:3}];function r(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"laravel-blade-template",children:"Laravel Blade Template"}),"\n",(0,a.jsxs)(t.h2,{id:"menggunakan-section-and-yield",children:["Menggunakan ",(0,a.jsx)(t.code,{children:"@section()"})," and ",(0,a.jsx)(t.code,{children:"@yield()"})]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"// resources/views/layouts/app.blade.php\n\n<!DOCTYPE html>\n<html>\n\t<head>\n\t\t// <title>@yield('title')</title>\n\t\t<title>{{ $title ?? 'Default Title' }}</title> \n\t<head>\n\t<body>\n\t\t@yield('content') // identifiernya: 'content'\n\t</body>\n</html>\n"})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"// resources/views/posts/index.blade.php\n\n@extends('layouts.app', [\n\t'title' => 'Ini Title Laravel App' // masuk ke <title>{{ $title ?? '' }}</title>  pada .../layouts/app.blade.php\n]) // didapat dari resources/views/layouts/app.blade.php\n\n@section('title', 'Ini Title Laravel App') // masuk ke <title>@yield('title')</title> pada .../layouts/app.blade.php\n\n@section('content') // masuk ke @yield('content') pada layouts/app.blade.php\n\t<p>Lorem Ipsu Dolar...</p>\n\t<p>Lorem Ipsu Dolar...</p>\n@endsection\n"})}),"\n",(0,a.jsx)(t.h2,{id:"menggunakan-blade-component",children:"Menggunakan Blade Component"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"// resources/views/components/layouts/app.blade.php\n\n<!DOCTYPE html>\n<html>\n\t<head>\n\t\t// <title>@yield('title')</title>\n\t\t<title>{{ $title ?? 'Default Title' }}</title> \n\t<head>\n\t<body>\n\t\t{{ $slot }} // sama seperti childern pada reactjs\n\t</body>\n</html>\n"})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"// resources/views/posts/index.blade.php\n<x-layouts.app title=\"Daftar Post\"> // opsional @slot('title', 'value')\n\t@slot('title', 'Daftar Post') // masuk ke <title>{{ $title ?? 'Default Title' }}</title> \n\t// Sisanya masuk ke {{ $slot }} pada .../views/components/layouts/app.blade.php\n\t<p>Lorem Ipsu Dolar...</p>\n\t<p>Lorem Ipsu Dolar...</p>\n</x-layouts.app>\n"})}),"\n",(0,a.jsxs)(t.h3,{id:"mengubah-x-layoutapp-menjadi-x-app-layout",children:["Mengubah ",(0,a.jsx)(t.code,{children:"x-layout.app"})," menjadi ",(0,a.jsx)(t.code,{children:"x-app-layout"})]}),"\n",(0,a.jsxs)(t.p,{children:["Saya ingin mengubah ",(0,a.jsx)(t.code,{children:"layout"})," tidak berada pada folder ",(0,a.jsx)(t.code,{children:".../view/components/layouts"})," maka perlu membuat ",(0,a.jsx)(t.code,{children:"class"})," untuk mengelola ",(0,a.jsx)(t.code,{children:"view"})," Blade Component. Anda dapat menggunakan ",(0,a.jsx)(t.code,{children:"php artisan"})," untuk membuat component ",(0,a.jsx)(t.code,{children:"AppLayout"})]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"php artisan make:component AppLayout\n"})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"// app\\View\\Components\\AppLayout.php\n\n<?php\n\nnamespace App\\View\\Components;\n\nuse Illuminate\\View\\Component;\nuse Illuminate\\View\\View;\n\n// AppLayout nanti akan di convert menjadi <x-app-layout>...</x-app-layout>\n// Jika namanya LayoutApp conver `<x-layout-app>...</x-layout-app>`\nclass AppLayout extends Component\n{\n\tpublic $title;\n\t\n\tpublic function __construct($title = null)\n\t{\n\t\t$this->title = $title ?? 'Default Title';\n\t}\n\t\n    /**\n     * Get the view / contents that represents the component.\n     */\n    public function render(): View\n    {\n\t    // return view('components.app-layout'); // Default saat membuat view component menggunakan `php artisan make:component AppLayout`\n        return view('layouts.app'); // menuju ke file resources/views/layouts/app.blade.php\n    }\n}\n\n"})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"// \u274c resources/views/components/layouts/app.blade.php\n// \u2705 resources/views/layouts/app.blade.php\n\n<!DOCTYPE html>\n<html>\n\t<head>\n\t\t// <title>@yield('title')</title>\n\t\t// <title>{{ $title ?? 'Default Title' }}</title> \n\t\t<title>{{ $title }}</title> // Default Value di taruh pada app\\View\\Components\\AppLayout.php\n\t<head>\n\t<body>\n\t\t{{ $slot }} // sama seperti childern pada reactjs\n\t</body>\n</html>\n"})}),"\n",(0,a.jsxs)(t.p,{children:["Pemakaian pada ",(0,a.jsx)(t.code,{children:"posts/index.blade.php"})]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"// resources/views/posts/index.blade.php\n<x-app-layout title=\"Daftar Post\"> // opsional @slot('title', 'value') untuk menggunakan atribute 'title' pastikan ada properti public $title; pada app\\View\\Components\\AppLayout.php\n\t@slot('title', 'Daftar Post') // masuk ke <title>{{ $title ?? 'Default Title' }}</title> \n\t// Sisanya masuk ke {{ $slot }} pada .../views/components/layouts/app.blade.php\n\t<p>Lorem Ipsu Dolar...</p>\n\t<p>Lorem Ipsu Dolar...</p>\n</x-app-layout>\n"})}),"\n",(0,a.jsx)(t.h2,{id:"issetvariable",children:(0,a.jsx)(t.code,{children:"@isset($variable)"})}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"@isset()"})," digunakan untuk mengecek apakah ",(0,a.jsx)(t.code,{children:"$variable"})," bernilai ",(0,a.jsx)(t.code,{children:"null"})," atau tidak."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"// resources/views/layouts/app.blade.php\n\n<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>{{ $title }}</title>\n\t<head>\n\t<body>\n\t\t@isset($header) // jika $header tidak `null` maka <div> dibawah akan ditampilkan/dirender\n\t\t\t<div class='header'>\n\t\t\t\t{{ $header }}\n\t\t\t</div>\n\t\t@endisset\n\t\t{{ $slot }} // sama seperti childern pada reactjs\n\t</body>\n</html>\n"})}),"\n",(0,a.jsxs)(t.h2,{id:"stackstyles-stackscripts-pushstyles-dan-pushscripts",children:[(0,a.jsx)(t.code,{children:"@stack('styles')"}),", ",(0,a.jsx)(t.code,{children:"@stack('scripts')"}),", ",(0,a.jsx)(t.code,{children:"@push('styles')"}),", dan ",(0,a.jsx)(t.code,{children:"@push('scripts')"})]}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"stack = tumpukan"}),"\n",(0,a.jsx)(t.li,{children:"push = dorong ke tumpukan"}),"\n"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"// resources/views/layouts/app.blade.php\n\n<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>{{ $title }}</title>\n\t\t@stack('styles')\n\t<head>\n\t<body>\n\t\t{{ $slot }} // sama seperti childern pada reactjs\n\t\t\n\t\t@stack('scripts')\n\t</body>\n</html>\n"})}),"\n",(0,a.jsxs)(t.p,{children:["Pemakaian pada ",(0,a.jsx)(t.code,{children:"posts/index.blade.php"})]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"// resources/views/posts/index.blade.php\n<x-app-layout title=\"Daftar Post\">\n\t@push('styles')\n\t\t<link rel=\"stylesheet\" href=\"...\"/>\n\t@endpush\n\t\t\n\t<p>Lorem Ipsu Dolar...</p>\n\t<p>Lorem Ipsu Dolar...</p>\n\t\n\t@push('scripts')\n\t\t<script>\n\t\t\tconsole.log('Ini Daftar Post');\n\t\t<\/script>\n\t@endpush\n</x-app-layout>\n"})}),"\n",(0,a.jsxs)(t.h2,{id:"example-blade-component-button",children:["Example Blade Component: ",(0,a.jsx)(t.code,{children:"button"})]}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"resource/views/components/button.blade.php"})}),"\n"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"<button {{ $attributes\n\t\t\t\t->merge([\n\t\t\t\t\t'class' => 'rounded bg-black px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-500'\n\t\t\t\t])\n}}>\n\t{{ $slot }}\n</button>\n"})}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Penggunaan"}),"\n"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"<x-app-layout>\n\t<x-button>Submit</x-button>\n</x-app-layout>\n"})}),"\n",(0,a.jsx)(t.h2,{id:"snippets-custom-for-blade-component",children:"Snippets Custom for Blade Component"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"xxx\\snippets\\blade.json"})}),"\n"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{\n\t// ...\n\t"Make attribute merge class": {\n\t\t"prefix": "attr:class",\n\t\t"body": [\n\t\t\t"{{ \\\\$attributes->merge([\'class\' => \'$1\',]) }}"\n\t\t]\n\t},\n\t"Make attribute merge class unsafe": {\n\t\t"prefix": "attr:class!",\n\t\t"body": [\n\t\t\t"{!! \\\\$attributes->merge([\'class\' => \'$1\',]) !!}"\n\t\t]\n\t},\n\t"Make variable $slot": {\n\t\t"prefix": "slotvar",\n\t\t"body": [\n\t\t\t"{{ \\\\$slot }}"\n\t\t]\n\t}\n}\n'})}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"snippets blade",src:n(81003).Z+"",width:"958",height:"695"})}),"\n",(0,a.jsx)(t.h2,{id:"tailwind-merge-laravel",children:"Tailwind Merge Laravel"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"composer require gehrisandro/tailwind-merge-laravel\n"})}),"\n",(0,a.jsx)(t.h3,{id:"snippets-custom-for-blade-component-twmarge",children:"Snippets Custom for Blade Component twMarge"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"xxx\\snippets\\blade.json"})}),"\n"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{\n\t// ...\n\t"Make attribute twMerge class": {\n\t\t"prefix": "attr:twclass",\n\t\t"body": [\n\t\t\t"{{ \\\\$attributes->twMerge([\'class\' => \'$1\',]) }}"\n\t\t]\n\t},\n\t"Make attribute twMerge class unsafe": {\n\t\t"prefix": "attr:twclass!",\n\t\t"body": [\n\t\t\t"{!! \\\\$attributes->twMerge([\'class\' => \'$1\',]) !!}"\n\t\t]\n\t},\n}\n'})})]})}function c(e={}){const{wrapper:t}={...(0,l.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(r,{...e})}):r(e)}},81003:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/snippets-blade-47a1208ae37758ed7fa5e81727e8a90b.gif"},11151:(e,t,n)=>{n.d(t,{Z:()=>p,a:()=>i});var a=n(67294);const l={},s=a.createContext(l);function i(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function p(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);