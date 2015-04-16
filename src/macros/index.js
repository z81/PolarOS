let > = macro {
    rule infix {$value | [$a:lit : $b:lit] } => {($value || '').substr($a, $b)}
    rule infix {$value | [$a:lit : -$b:lit] } => {($value || '').substr($a, ($value || '').length-$b-1)}
    rule infix {$value | [$b:lit] } => {($value || '').substr($b)}
    rule infix {$value | [$b:lit:] } => {($value || '').substr($b)}
    rule infix {$value | [:$b:lit] } => {($value || '').substr(0,$b)}
}

let ? = macro {
    rule infix {$value|} => { typeof $value }
    rule infix {$value.string|} => { typeof $value == 'string' }
    rule infix {$value.str|} => { typeof $value == 'string' }
    rule infix {$value.number|} => { typeof $value == 'number' }
    rule infix {$value.num|} => { typeof $value == 'number' }
    rule infix {$value.boolean|} => { typeof $value == 'boolean' }
    rule infix {$value.bool|} => { typeof $value == 'boolean' }
    rule infix {$value.array|} => { $value instanceof Array }
    rule infix {$value.arr|} => { $value instanceof Array }
    rule infix {$value.object|} => { typeof $value == 'object' }
    rule infix {$value.obj|} => { typeof $value == 'object' }
    rule infix {$value.undefined|} => { typeof $value == 'undefined' }
    rule infix {$value.un|} => { typeof $value == 'undefined' }
}

let remove = macro {
    rule infix {|$value[$i]} => { $value.splice($i, 1) }
}

/*
var a = "[class]";
var b = 1;
var arr = [1,2,3,4,5];
var obj = {};
console.log("[class]">[1:-1])
console.log("[class]">[1:1])
console.log("[class]">[1])
console.log("[class]">[1:])
console.log("[class]">[:1])
console.log(a>[:1])

console.log(a?)
console.log(a.string?)
console.log(b.num?)
console.log(arr.arr?)
console.log(obj.arr?)
console.log(b.arr?)
console.log(obj.obj?)
console.log(ff.un?)

remove arr[2]
console.log(arr)

*/