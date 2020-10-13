Rails.application.routes.draw do
  
  resources :categories, only: [:index]
  resources :entries#, only: [:index, :show, :update, :create]
  
end
