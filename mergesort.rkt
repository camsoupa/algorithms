#lang racket

(define (to-index num)
  (inexact->exact (round num)))

(define (add-to-end lst item)
  (append lst (list item)))

(define (mergesort lst)
  (if (<= (length lst) 1)
      lst
      (let* (
        [half-len (to-index (/ (length lst) 2))]
        [left (mergesort 
                  (take lst half-len))]
        [right (mergesort 
                (list-tail lst half-len))])
        (merge left right empty))))

(define (merge left right merged)
  (cond 
      [(and (not (empty? left)) 
            (or (empty? right)
                (and (not (empty? right))
                (< (first left) (first right)))))
              (merge (rest left) right (add-to-end merged (first left)))]
      [(not (empty? right)) 
              (merge left (rest right) (add-to-end merged (first right)))]
      [else merged]))

      