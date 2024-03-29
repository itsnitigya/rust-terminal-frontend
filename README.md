# Rust Terminal Frontend

## Local Dev (Install):

``` bash
git clone https://github.com/itsnitigya/rust-terminal-frontend
cd rust-terminal-frontend/src
yarn
yarn start 
```
## Commands tested on Terminal:

``` bash
ls
date
touch testing.txt
```

## Rust code tested :

``` rust
fn main() {
   println!(\"hello world \");
}
```
``` rust
fn main() {
   let x = 10;
   println!(\"The value of x is: {}\", x);
}
```
``` rust
fn main() {
   let mut x = 10;
   print!(\"The value of x is: {}\", x);
   x = 20;
   print!(\"The value of x is: {}\", x);
}
```

## Terminal Connected with Container
<img width="1440" alt="Screenshot 2021-06-04 at 1 30 18 AM" src="https://user-images.githubusercontent.com/40539705/120720117-1ee9e080-c4e9-11eb-80a9-500e7d708643.png">

## Rust code execution
<img width="1439" alt="Screenshot 2021-06-04 at 3 56 48 AM" src="https://user-images.githubusercontent.com/40539705/120720123-227d6780-c4e9-11eb-913a-d4d659e8cd6f.png">

## Code executed in Terminal ( same container where code is executed )
<img width="1440" alt="Screenshot 2021-06-04 at 4 11 45 AM" src="https://user-images.githubusercontent.com/40539705/120721316-34f8a080-c4eb-11eb-93df-70f76dd14c55.png">

## Error execution
<img width="1440" alt="Screenshot 2021-06-04 at 5 01 49 PM" src="https://user-images.githubusercontent.com/40539705/120795543-3e1f5700-c557-11eb-80f1-41ce41f7d5a2.png">
