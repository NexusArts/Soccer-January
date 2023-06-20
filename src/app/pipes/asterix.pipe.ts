import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "asterix",
})
export class AsterixPipe implements PipeTransform {
  // ch =abderrahmen => "abd*rr*hm*n"

  transform(ch) {
   
    let result = "";
    let vowel = ["a", "e", "i", "o", "u", "y"];
  
    for (let i = 0; i < ch.length; i++) {
      let x = ch[i];
      for (let j = 0; j < vowel.length; j++) {
        if (vowel[j] === ch[i].toLowerCase) {
          x='*';
          break;
        }
      }
        result = result + x;
    }
    console.log(result);
  return result ; 
    
  }
}