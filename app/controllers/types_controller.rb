class TypesController < ApplicationController
	
	def index
        types = Type.all
        render json: TypeSerializer.new(types)
    end


	#def show
    #    @type = Type.find(params[:id])
    #    render json: @type, status: 200
    #end 

    def create
      type = Type.create(type_params)
      if type.save
        render json: TypeSerializer.new(type), status: :accepted
      else
        render json: {errors: type.errors.full_messages}, status:
        :unprocessible_entity
      end
    end


    #def update 
    #    @type.update(type_params)
    #    if @type.save
    #      render json: @type, status: 200
    #    else
    #      render json: { errors: @type.errors.full_messages }, status: :unprocessible_entity
    #    end
    #end 

    #def destroy
    #    type = Type.find_by(id: params[:id])
    #    type.destroy
    #    render json: type
    #end

    private

    def type_params
        params.require(:type).permit(:name)
    end

    #def find_type
    #    @type = Type.find(params[:id])
    #end
end