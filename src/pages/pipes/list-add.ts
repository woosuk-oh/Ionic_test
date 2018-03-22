import { Injectable, Pipe } from "@angular/core";

@Pipe({
  name: 'listAdd'
})
@Injectable()
export class ListAdd{
  transform(value, args?){


    return 'hello '
  }
}
