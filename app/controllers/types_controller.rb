class TypesController < ApplicationController
	
	def index
        types = Type.all
        render json: TypeSerializer.new(types)
    end
end